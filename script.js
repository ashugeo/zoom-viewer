window.onload = () => {
  const area = document.querySelector('textarea');

  area.addEventListener(
    'input',
    (e) => {
      document.getElementById('convo').innerHTML = '';

      const text = e.target.value;
      if (!text.length) return;

      const lines = text.split('\n');
      const messages = [];
      let from = null;

      for (const line of lines) {
        if (line.match(/Me to [\w -]+ \(\d{2}:\d{2}\)/)?.length) {
          from = 'Justin';
          messages.push({ from, text: null, ts: line.match(/Me to [\w -]+ \((\d{2}:\d{2})\)/)[1] });
        } else if (line.match(/[\w -]+ to [\w -]+ \(\d{2}:\d{2}\)/)?.length) {
          from = 'Me';
          messages.push({ from, text: null, ts: line.match(/[\w -]+ to [\w -]+ \((\d{2}:\d{2})\)/)[1] });
        } else {
          messages.push({ from, text: line });
        }
      }

      for (const message of messages) {
        let div = document.createElement('div');

        if (!message.text) {
          div.textContent = `${message.from} · ${message.ts}`;
          div.className = `flex-none mt-2 text-gray-500 text-xs ${message.from === 'Me' ? 'self-end' : ''}`;
        } else {
          div.textContent = message.text;
          div.className = `inline-block px-3.5 py-2 bg-gray-700 rounded-3xl ${
            message.from === 'Me' ? 'self-end bg-blue-500' : ''
          }`;
        }

        document.getElementById('convo').appendChild(div);
      }
    },
    false,
  );
};
