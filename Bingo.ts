class Bingo {
    private carton: number[] = [];
    private bolasLlamadas: number[] = [];
    private bolasMarcadas: number[] = [];

    constructor() {
        this.carton = this.generarCarton();
        this.bolasLlamadas = this.generarBolas();
    }

    // Genera el cartón de bingo (15 números entre 1 y 90)
    private generarCarton(): number[] {
        const carton: number[] = [];
        while (carton.length < 15) {
            const numero = Math.floor(Math.random() * 90) + 1;
            if (!carton.includes(numero)) {
                carton.push(numero);
            }
        }
        carton.sort((a, b) => a - b);
        return carton;
    }

    // Genera las bolas sorteadas (90 bolas posibles)
    private generarBolas(): number[] {
        const bolas: number[] = [];
        while (bolas.length < 90) {
            const bola = Math.floor(Math.random() * 90) + 1;
            if (!bolas.includes(bola)) {
                bolas.push(bola);
            }
        }
        return bolas;
    }

    // Función para mostrar el cartón con los números marcados
    private mostrarCarton(): void {
        const cartonMarcado = this.carton.map(num =>
            this.bolasMarcadas.includes(num) ? `${num} (Marcado)` : `${num}`
        );
        console.table("Cartón de Bingo:");
        console.table(cartonMarcado.join(' '));
    }

    // Función principal del juego
    public jugar(): void {
        console.log("¡Comienza el juego de Bingo!");

        let bingo = false;
        this.mostrarCarton();

        for (const bola of this.bolasLlamadas) {
            console.log(`Bola llamada: ${bola}`);

            // Si la bola está en el cartón, la marcamos
            if (this.carton.includes(bola)) {
                this.bolasMarcadas.push(bola);
                console.log(`¡Marcado! Número: ${bola}`);
            }

            // Mostrar el estado del cartón
            this.mostrarCarton();

            // Verificar si se ha alcanzado el Bingo
            if (this.bolasMarcadas.length === this.carton.length) {
                bingo = true;
                break;
            }
        }

        if (bingo) {
            console.log("¡Bingo! Has marcado todos los números.");
        } else {
            console.log("El juego ha terminado, pero no hay Bingo.");
        }
    }
}

// Crear una instancia del juego y ejecutarlo



