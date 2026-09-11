async function sendLeadNotification(lead, priorCount = 0) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if(!token || !chatId) {
        console.warn('Telegram not configured — skipping notification');
        return;
    }

     const repeatWarning =
     priorCount > 0
      ? `⚠️ Повторне звернення (${priorCount + 1}-й раз)\n\n`
      : '';

    const text =
    `🐝 Новий лід!\n\n` +
    repeatWarning +
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

async function sendOrderNotification(order) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram not configured — skipping notification');
    return;
  }

  const itemLines = order.items
  .map((item) => `  • ${item.name} (${item.unit}) x${item.quantity} — ${item.price * item.quantity} грн`)
  .join('\n');

  const text =
    `🛒 Нове замовлення!\n\n` +
    `Ім'я: ${order.name}\n` +
    `Телефон: ${order.phone}\n\n` +
    `Товари:\n${itemLines}\n\n` +
    `Разом: ${order.totalPrice} грн`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Telegram order notification failed:', err);
    }
  } catch (err) {
    console.error('Telegram order notification error:', err);
  }
}

module.exports = { sendLeadNotification, sendOrderNotification };
