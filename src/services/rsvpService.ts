export interface GuestData {
    nombre: string;
    cupos_totales: number;
    cupos_confirmados: number;
    asistira: boolean;
}

const WEBHOOK_URL = "https://hook.us1.make.com/your-webhook-id"; // Placeholder - User to replace

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
