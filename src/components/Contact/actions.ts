'use server';

export async function sendNotification(data: FormData) {
    const msg = `Contact from Site\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nMessage: ${data.get('message')}`;    
    const res = await fetch(`https://ntfy.sh/${process.env.NEXT_PUBLIC_NTFY_TOPIC}`, {
        method: 'POST',
        body: msg
    });    
    if (!res.ok) {
        throw new Error('Failed to send notification');
    }
    console.log(res);
    
}
