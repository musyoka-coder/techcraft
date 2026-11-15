/* All answers are local. Add supported topics to the if/else rules below. */
(function (root) {
  'use strict';
  const FALLBACK = 'my creator has prohibited me from saying that';
  const link = (label, href) => ({ label, href });
  const booking = link('Book a consultation', '/booking.html');
  const pricing = link('View pricing', '/pricing.html');
  const crypto = link('Continue to KryptoPesa', 'https://kryptopesa.app');
  const reply = (text, links = []) => ({ text, links });
  const services = [
    ['Custom software & websites', 'Responsive websites, web applications, management systems and digital platforms built around your business.', 'KSh 50,000–800,000'],
    ['Blockchain & FinTech', 'Blockchain integrations, KYC workflows, smart contracts and cryptocurrency-to-mobile-money solutions.', 'KSh 500,000–10,000,000'],
    ['Company profiles & branding', 'Company profiles, corporate branding and marketing materials that communicate your business clearly.', 'KSh 10,000–50,000'],
    ['Posters & digital flyers', 'Promotional posters, digital flyers and marketing assets for print and social channels.', 'KSh 2,500–25,000'],
    ['Logo & identity design', 'Distinctive logos and visual identity systems for your business.', 'KSh 5,000–30,000'],
    ['Educational technology', 'School management systems, learning management platforms and educational tools.', 'KSh 400,000–8,000,000']
  ];
  function answer(message) {
    const t = String(message).normalize('NFKC').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9+]+/g, ' ').trim();
    const has = pattern => new RegExp('\\b(?:' + pattern + ')\\b').test(t);
    const wantsPrice = has('prices?|pricing|costs?|how much|budget|fees?|rates?|charges?');
    let service = -1;
    if (has('school|schools|edtech|educational technology|learning management|lms')) service = 5;
    else if (has('logos?|identity design')) service = 4;
    else if (has('posters?|flyers?|digital marketing|marketing assets?')) service = 3;
    else if (has('branding|brand identity|company profiles?|corporate identity')) service = 2;
    else if (has('blockchain|fintech|smart contracts?|kyc|defi')) service = 1;
    else if (has('websites?|web development|web design|web apps?|web applications?|software|management systems?|e commerce|ecommerce|online store')) service = 0;

    if (has('crypto|cryptocurrency|cryptocurrencies|bitcoin|btc|ethereum|eth|solana|sol|worldcoin|wld|kryptopesa|krypto pesa|m pesa|mpesa|wallets?|stablecoins?|usdt|seed phrase|private keys?')) {
      if (service === 1 && has('build|develop|integration|integrate|services?')) {
        return reply(services[1][1] + (wantsPrice ? '\n\nPublished range: ' + services[1][2] + '. Final pricing depends on scope.' : '') + '\n\nFor crypto-to-M-Pesa information, continue to KryptoPesa.', [booking, crypto]);
      } else if (has('seed phrase|private keys?|scam|safety|safe|security')) {
        return reply('A wallet’s private key or recovery phrase controls access to its funds. Never share it in this chat. Confirm the destination and network before transferring crypto. Visit KryptoPesa for its own service information.', [crypto]);
      } else if (has('price|prices|rate|rates|today|live|profit|investment|invest|buy now|prediction')) {
        return reply('I do not have live crypto prices, exchange rates or price predictions. Visit KryptoPesa to check the information and options currently available there.', [crypto]);
      } else if (has('bitcoin|btc')) {
        return reply('Bitcoin (BTC) is a digital currency whose transactions are recorded on a decentralized blockchain. For crypto-to-M-Pesa information, continue to KryptoPesa.', [crypto]);
      } else if (has('ethereum|eth')) {
        return reply('Ethereum is a blockchain that supports smart contracts and applications. ETH is its native cryptocurrency. For crypto-to-M-Pesa information, continue to KryptoPesa.', [crypto]);
      } else if (has('solana|sol')) {
        return reply('Solana is a blockchain used for digital payments and applications. SOL is its native cryptocurrency. For crypto-to-M-Pesa information, continue to KryptoPesa.', [crypto]);
      } else if (has('worldcoin|wld')) {
        return reply('WLD is the token associated with the World project, formerly called Worldcoin. Visit KryptoPesa to check its current crypto service information.', [crypto]);
      } else if (has('wallet|wallets')) {
        return reply('A crypto wallet manages the keys used to access and transfer digital assets. Wallet addresses and networks must match the asset being transferred. Continue to KryptoPesa for its service information.', [crypto]);
      } else if (has('stablecoins?|usdt')) {
        return reply('Stablecoins are crypto tokens designed to track another asset, often a currency such as the US dollar. Their value is not guaranteed. Visit KryptoPesa for its current service information.', [crypto]);
      } else {
        return reply('Cryptocurrency is a digital asset transferred using blockchain networks. KryptoPesa is Techcraft’s crypto-to-M-Pesa project. Continue to kryptopesa.app to check available assets, verification requirements, fees and transaction options. This chat cannot access accounts or process swaps.', [crypto]);
      }
    } else if (has('automation|automate|chatbots?|recruitment|email automation|social media posting')) {
      return reply('Techcraft offers HR recruitment automation, email reply automation, social media posting automation and customer-support chatbots. Services can be arranged daily, weekly, monthly or permanently. Share your workflow with the team for a scoped quotation.', [link('Explore automation', '/automation.html'), booking]);
    } else if (service >= 0) {
      const item = services[service];
      if (wantsPrice) return reply(item[0] + '\n\n' + item[1] + '\n\nPublished range: ' + item[2] + '. Final pricing depends on project scope and requirements.', [pricing, booking]);
      else return reply(item[0] + '\n\n' + item[1], [pricing, booking]);
    } else if (has('pricing|prices?|costs?|how much|budget|fees?|quotation|quote')) {
      return reply('Published service ranges\n\n' + services.map(item => item[0] + ': ' + item[2]).join('\n') + '\n\nThese are indicative ranges, not final quotations. Send your requirements, features and integrations to the team for a scoped quote.', [pricing, booking]);
    } else if (has('learning|learn|tutorials?|courses?|certification|certificates?|coding|programming')) {
      return reply('The Techcraft Learning Portal covers HTML/CSS, JavaScript and Python, including loops, collections and object-oriented programming, with learning material and quizzes. Contact the team to confirm course and certification arrangements.', [link('Open Learning Portal', '/learning.html'), booking]);
    } else if (has('contact|email|phone|telephone|whatsapp|reach you|talk to|human|support')) {
      return reply('Contact Techcraft Limited\n\nEmail: techcraft.bookings@gmail.com\nPhone / WhatsApp: +254 792 627 702\n\nFor a project enquiry, include your goals, required features and preferred timeline.', [link('Email the team', 'mailto:techcraft.bookings@gmail.com'), link('WhatsApp', 'https://wa.me/254792627702'), link('Call Techcraft', 'tel:+254792627702')]);
    } else if (has('book|booking|consultation|schedule|meeting|appointment|hire|start a project')) {
      return reply('Book a consultation to discuss your project, requirements, integrations and timeline. Use the booking page to submit your enquiry; this chat does not make reservations.', [booking]);
    } else if (has('services?|offer|what do you do|what can you do|help|menu')) {
      return reply('Techcraft Limited offers:\n\n' + services.map(item => '• ' + item[0]).join('\n') + '\n• Business automation & chatbots\n• Programming learning resources\n\nAsk about a service, pricing, contact details, or crypto and KryptoPesa.', [link('Explore services', '/index.html#services'), booking]);
    } else if (has('privacy|personal data|store my|save my|history')) {
      return reply('This bot answers on your device. It does not send chat messages to a server or save them after a reload. External links open separate services with their own privacy practices.', [link('Privacy policy', '/privacy.html')]);
    } else if (has('creator|founder|owner|nicholus|musyoka|who made you|who built you')) {
      return reply('Techcraft Limited was founded by Nicholus Musyoka. I’m Techcraft Bot, the company’s guide to services, pricing, consultations and crypto basics.', [link('Contact Techcraft', '/index.html#contact')]);
    } else if (has('about techcraft|about tech craft|about the company|who is techcraft|what is techcraft|what is tech craft|who are you|your name')) {
      return reply('Techcraft Limited is a technology consultancy serving Kenyan businesses with software, blockchain and FinTech integration, branding, automation and educational technology. I’m Techcraft Bot, here to guide you through those services.', [link('Visit Techcraft', '/index.html')]);
    } else if (/^(hi|hello|hey|good morning|good afternoon|good evening|habari|jambo)( techcraft| bot)?$/.test(t)) {
      return reply('Welcome to Techcraft. I can help with services, pricing, automation, learning, contact details and crypto basics. Choose a topic below or type your question.');
    } else if (/^(thanks|thank you|thank you very much|asante|bye|goodbye)$/.test(t)) {
      return reply('Thank you for visiting Techcraft Limited.');
    } else {
      return reply(FALLBACK);
    }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { answer, FALLBACK };
  root.TechcraftBot = { answer, FALLBACK };
  if (typeof document === 'undefined') return;
  const log = document.getElementById('chatLog');
  const input = document.getElementById('userInput');
  const form = document.getElementById('chatForm');
  const send = document.getElementById('sendBtn');
  const welcome = document.getElementById('welcome');
  function addMessage(text, role, links = []) {
    const article = document.createElement('article');
    article.className = 'message ' + role;
    const label = document.createElement('span');
    label.className = 'message-label';
    label.textContent = role === 'user' ? 'You' : 'Techcraft Bot';
    const body = document.createElement('p');
    body.textContent = text;
    article.append(label, body);
    if (links.length) {
      const actions = document.createElement('div');
      actions.className = 'message-links';
      links.forEach(item => {
        const a = document.createElement('a');
        a.textContent = item.label;
        a.href = item.href;
        if (item.href.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        actions.append(a);
      });
      article.append(actions);
    }
    log.append(article);
    // Bound the DOM without storing or transmitting conversation history.
    while (log.children.length > 100) log.firstElementChild.remove();
    article.scrollIntoView({ block: 'nearest' });
  }
  function submit(text) {
    const message = text.trim().slice(0, 1000);
    if (!message) return;
    welcome.hidden = true;
    addMessage(message, 'user');
    const result = answer(message);
    addMessage(result.text, 'bot', result.links);
    input.value = '';
    send.disabled = true;
    input.focus({ preventScroll: true });
  }
  input.addEventListener('input', () => { send.disabled = !input.value.trim(); });
  form.addEventListener('submit', event => { event.preventDefault(); submit(input.value); });
  document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => submit(button.dataset.prompt)));
  document.getElementById('resetChat').addEventListener('click', () => {
    log.replaceChildren(); welcome.hidden = false; input.value = ''; send.disabled = true; input.focus({ preventScroll: true });
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
