export interface GuestData {
    fecha: string;
    nombre: string;
    cupos_totales: number;
    cupos_confirmados: number;
    estatus: string | boolean;
}

const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;

export const sendRSVP = async (data: GuestData): Promise<void> => {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al enviar la confirmación');
        }
    } catch (error) {
        console.error("RSVP Error:", error);
        throw error;
    }
};
