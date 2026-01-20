export const EVENT_DATA = {
    title: '1er Cumpleaños de Julieta 🎂',
    start: '20260222T130000',
    end: '20260222T190000',
    location: 'https://maps.app.goo.gl/Rp1kvsXvQ8N31r3W6',
    description: '¡Te esperamos en casa para celebrar el primer añito de Julieta! No olvides tu invitación digital.',
};

export const generateGoogleCalendarLink = () => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
        text: EVENT_DATA.title,
        dates: `${EVENT_DATA.start}/${EVENT_DATA.end}`,
        details: EVENT_DATA.description,
        location: EVENT_DATA.location,
    });
    return `${baseUrl}&${params.toString()}`;
};

export const downloadIcsFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Julieta 1st Birthday//EN
BEGIN:VEVENT
UID:${Date.now()}@julieta-cumple
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${EVENT_DATA.start}
DTEND:${EVENT_DATA.end}
SUMMARY:${EVENT_DATA.title}
DESCRIPTION:${EVENT_DATA.description}
LOCATION:${EVENT_DATA.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cumpleanos-julieta.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
