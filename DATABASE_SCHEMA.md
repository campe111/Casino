# Esquema de Base de Datos - KING OF COINS CASINO

## Recomendación de Base de Datos

Para este proyecto, se recomienda usar **PostgreSQL** o **MySQL** para producción, ya que:
- Manejan transacciones ACID (crítico para apuestas)
- Escalabilidad para múltiples usuarios
- Buen rendimiento con relaciones
- Soporte para índices y consultas complejas

**Alternativa ligera:** Para proyectos pequeños o desarrollo, se puede usar **SQLite** con Prisma/TypeORM.

---

## Esquema de Tablas

### 1. Tabla: `usuarios`

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    dni INTEGER UNIQUE NOT NULL,
    edad INTEGER NOT NULL CHECK (edad >= 18),
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (saldo >= 0),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    INDEX idx_nombre_usuario (nombre_usuario),
    INDEX idx_dni (dni)
);
```

### 2. Tabla: `juegos`

```sql
CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Datos iniciales:**
```sql
INSERT INTO juegos (nombre, descripcion) VALUES
('Slots STD', 'Tragamonedas estándar'),
('Slots Premium', 'Tragamonedas premium'),
('Blackjack', 'Juego de cartas Blackjack'),
('Bingo', 'Juego de Bingo');
```

### 3. Tabla: `apuestas`

```sql
CREATE TABLE apuestas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    juego_id INTEGER NOT NULL,
    monto DECIMAL(10, 2) NOT NULL CHECK (monto > 0),
    resultado ENUM('ganada', 'perdida', 'empate') NOT NULL,
    ganancia DECIMAL(10, 2) DEFAULT 0.00,
    saldo_antes DECIMAL(10, 2) NOT NULL,
    saldo_despues DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (juego_id) REFERENCES juegos(id),
    INDEX idx_usuario_fecha (usuario_id, fecha),
    INDEX idx_juego_fecha (juego_id, fecha)
);
```

### 4. Tabla: `sesiones`

```sql
CREATE TABLE sesiones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    activa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_usuario_activa (usuario_id, activa)
);
```

### 5. Tabla: `transacciones_saldo`

```sql
CREATE TABLE transacciones_saldo (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    tipo ENUM('carga', 'apuesta', 'ganancia', 'retiro') NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    saldo_antes DECIMAL(10, 2) NOT NULL,
    saldo_despues DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario_fecha (usuario_id, fecha),
    INDEX idx_tipo_fecha (tipo, fecha)
);
```

---

## Modelo con Prisma (TypeScript)

Si prefieres usar Prisma, aquí está el esquema equivalente:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // o "mysql" o "sqlite"
  url      = env("DATABASE_URL")
}

model Usuario {
  id            Int       @id @default(autoincrement())
  nombreUsuario String   @unique @map("nombre_usuario") @db.VarChar(50)
  dni           Int      @unique
  edad          Int
  saldo         Decimal  @default(0) @db.Decimal(10, 2)
  fechaRegistro DateTime  @default(now()) @map("fecha_registro")
  ultimoAcceso  DateTime? @map("ultimo_acceso")
  activo        Boolean  @default(true)
  apuestas      Apuesta[]
  sesiones      Sesion[]
  transacciones TransaccionSaldo[]

  @@index([nombreUsuario])
  @@index([dni])
  @@map("usuarios")
}

model Juego {
  id          Int       @id @default(autoincrement())
  nombre      String    @db.VarChar(50)
  descripcion String?   @db.Text
  activo      Boolean   @default(true)
  fechaCreacion DateTime @default(now()) @map("fecha_creacion")
  apuestas    Apuesta[]

  @@map("juegos")
}

model Apuesta {
  id           Int      @id @default(autoincrement())
  usuarioId    Int      @map("usuario_id")
  juegoId      Int      @map("juego_id")
  monto        Decimal  @db.Decimal(10, 2)
  resultado    Resultado
  ganancia     Decimal  @default(0) @db.Decimal(10, 2)
  saldoAntes   Decimal  @map("saldo_antes") @db.Decimal(10, 2)
  saldoDespues Decimal  @map("saldo_despues") @db.Decimal(10, 2)
  fecha        DateTime @default(now())
  usuario      Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)
  juego        Juego    @relation(fields: [juegoId], references: [id])

  @@index([usuarioId, fecha])
  @@index([juegoId, fecha])
  @@map("apuestas")
}

enum Resultado {
  ganada
  perdida
  empate
}

model Sesion {
  id         Int       @id @default(autoincrement())
  usuarioId  Int       @map("usuario_id")
  token      String    @unique
  fechaInicio DateTime @default(now()) @map("fecha_inicio")
  fechaFin   DateTime? @map("fecha_fin")
  ipAddress  String?   @map("ip_address") @db.VarChar(45)
  userAgent  String?   @map("user_agent") @db.Text
  activa     Boolean   @default(true)
  usuario    Usuario   @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([usuarioId, activa])
  @@map("sesiones")
}

model TransaccionSaldo {
  id          Int       @id @default(autoincrement())
  usuarioId   Int       @map("usuario_id")
  tipo        TipoTransaccion
  monto       Decimal   @db.Decimal(10, 2)
  saldoAntes  Decimal   @map("saldo_antes") @db.Decimal(10, 2)
  saldoDespues Decimal  @map("saldo_despues") @db.Decimal(10, 2)
  descripcion String?   @db.Text
  fecha       DateTime  @default(now())
  usuario     Usuario   @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  @@index([usuarioId, fecha])
  @@index([tipo, fecha])
  @@map("transacciones_saldo")
}

enum TipoTransaccion {
  carga
  apuesta
  ganancia
  retiro
}
```

---

## Configuración de Base de Datos

### PostgreSQL (Recomendado)

```bash
# Instalación
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# macOS:
brew install postgresql

# Crear base de datos
createdb casino_db

# Variables de entorno
DATABASE_URL="postgresql://usuario:password@localhost:5432/casino_db?schema=public"
```

### MySQL

```bash
# Instalación
# Ubuntu/Debian:
sudo apt-get install mysql-server

# macOS:
brew install mysql

# Crear base de datos
mysql -u root -p
CREATE DATABASE casino_db;

# Variables de entorno
DATABASE_URL="mysql://usuario:password@localhost:3306/casino_db"
```

---

## Migraciones

Ejemplo con Prisma:

```bash
# Inicializar Prisma
npx prisma init

# Crear migración
npx prisma migrate dev --name init

# Generar cliente
npx prisma generate
```

---

## Consideraciones de Seguridad

1. **Validación de Saldo:** Siempre usar transacciones para operaciones de saldo
2. **Índices:** Agregar índices en campos de búsqueda frecuente
3. **Backups:** Implementar backups automáticos diarios
4. **Encriptación:** Encriptar datos sensibles (no necesario para saldo, pero sí para tokens)
5. **Rate Limiting:** Implementar límites de apuestas por tiempo

---

## Consultas Útiles

```sql
-- Obtener historial de apuestas de un usuario
SELECT a.*, j.nombre as juego_nombre
FROM apuestas a
JOIN juegos j ON a.juego_id = j.id
WHERE a.usuario_id = ?
ORDER BY a.fecha DESC
LIMIT 50;

-- Estadísticas de un usuario
SELECT 
    COUNT(*) as total_apuestas,
    SUM(CASE WHEN resultado = 'ganada' THEN 1 ELSE 0 END) as ganadas,
    SUM(CASE WHEN resultado = 'perdida' THEN 1 ELSE 0 END) as perdidas,
    SUM(ganancia) as ganancia_total
FROM apuestas
WHERE usuario_id = ?;

-- Top juegos más jugados
SELECT j.nombre, COUNT(*) as veces_jugado
FROM apuestas a
JOIN juegos j ON a.juego_id = j.id
GROUP BY j.id, j.nombre
ORDER BY veces_jugado DESC;
```

