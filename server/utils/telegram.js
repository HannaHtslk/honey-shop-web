async function sendLeadNotification(lead) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if(!token || !chatId) {
        console.warn('Telegram not configured — skipping notification');
        return;
    }

    const text =
    `🐝 Новий лід!\n\n` +
    `Ім'я: ${lead.name}\n` +
    `Телефон: ${lead.phone}\n` +
    `Товар: ${lead.productInterest || '—'}\n` +
    `Повідомлення: ${lead.message || '—'}`;

    try{
        const res = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        })
        if(!res.ok){
            const errorText = await res.text();
            console.error('Error sending Telegram notification:', res.status, errorText);
        }
    } catch(error){
        console.error('Error sending Telegram notification:', error);
    }
}

module.exports = { sendLeadNotification };