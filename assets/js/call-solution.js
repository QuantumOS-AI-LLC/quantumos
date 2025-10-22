$(document).ready(function () {
  const $chatContainer = $("#chatContainer");
  const $typingText = $("#typingText");
  const $cursor = $("#cursor");
  const $placeholder = $("#placeholder");
  let messageElements = [];

  const conversation = [
    { type: "user", text: "Hi, I need to reset my Wi-Fi password.", delay: 1000, typing: true },
    { type: "loading", text: "Checking account details...", delay: 2000 },
    { type: "bot", text: 'Sure, I see your current network is "Johnson Home WiFi." Do you want me to generate a new password or would you like to set your own?', delay: 1500 },
    { type: "user", text: "Please generate a new one.", delay: 2000, typing: true },
    { type: "loading", text: "Generating...", delay: 2000 },
    { type: "bot", text: 'Done. Your new password is "BrightSky82." It will be active immediately across all devices.', delay: 1500 },
  ];

  function clearChat() {
    messageElements.forEach((el) => {
      if (el && el.parent().length) {
        el.addClass("message-exit");
        setTimeout(() => el.remove(), 300);
      }
    });
    messageElements = [];
    $typingText.text("");
    $cursor.addClass("hidden");
    $placeholder.removeClass("hidden");
  }

  function typeMessage(text, callback) {
    $placeholder.addClass("hidden");
    $cursor.removeClass("hidden");
    $typingText.text("");
    let i = 0;
    const interval = setInterval(() => {
      $typingText.text($typingText.text() + text[i]);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(() => {
          $cursor.addClass("hidden");
          $typingText.text("");
          $placeholder.removeClass("hidden");
          callback();
        }, 400);
      }
    }, 40);
  }

  function addMessage(text, type) {
    const $messageDiv = $("<div>")
      .addClass(`message-bubble flex ${type === "user" ? "justify-end" : "justify-start"}`);

    if (type === "user") {
      $messageDiv.html(`
        <div class="max-w-xs">
          <div class="bg-gray-100 text-gray-900 rounded-2xl px-4 py-2.5">
            <p class="text-sm">${text}</p>
          </div>
        </div>`);
    } else {
      $messageDiv.html(`
        <div class="flex items-start space-x-2 max-w-xs">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"></path>
            </svg>
          </div>
          <div class="bg-black rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-300">
            <p class="text-sm text-white">${text}</p>
          </div>
        </div>`);
    }

    $chatContainer.append($messageDiv);
    messageElements.push($messageDiv);

    setTimeout(() => {
      $messageDiv.addClass("show");
      $chatContainer.scrollTop($chatContainer[0].scrollHeight);
    }, 50);

    return $messageDiv;
  }

  function showLoadingState(text) {
    const $loadingDiv = $("<div>").addClass("message-bubble flex justify-start");
    $loadingDiv.html(`
      <div class="flex items-start space-x-2">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"></path>
          </svg>
        </div>
        <div class="bg-black text-white rounded-2xl px-4 py-2.5 flex items-center space-x-2 shadow-sm transition-all duration-300">
          <div class="loading-spinner">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <span class="text-sm loading-text">${text}</span>
        </div>
      </div>`);

    $chatContainer.append($loadingDiv);
    messageElements.push($loadingDiv);

    setTimeout(() => {
      $loadingDiv.addClass("show");
      $chatContainer.scrollTop($chatContainer[0].scrollHeight);
    }, 50);

    return $loadingDiv;
  }

  async function runAnimation() {
    let $lastBotBubble = null;

    for (const item of conversation) {
      await new Promise((r) => setTimeout(r, item.delay));

      if (item.type === "user" && item.typing) {
        await new Promise((r) => {
          typeMessage(item.text, () => {
            addMessage(item.text, "user");
            r();
          });
        });
      } else if (item.type === "loading") {
        $lastBotBubble = showLoadingState(item.text);
      } else if (item.type === "bot") {
        if ($lastBotBubble) {
          const $spinner = $lastBotBubble.find(".loading-spinner");
          const $textEl = $lastBotBubble.find("span.loading-text");
          $spinner.remove();

          if ($textEl.length) {
            $textEl.css("opacity", 0);
            setTimeout(() => {
              $textEl.text(item.text);
              $textEl.removeClass("loading-text").addClass("text-sm");
              $textEl.css({ transition: "opacity 0.4s ease", opacity: 1 });
            }, 200);
          }
          $lastBotBubble = null;
        } else {
          addMessage(item.text, "bot");
        }
      }
    }

    await new Promise((r) => setTimeout(r, 3000));
    clearChat();
    await new Promise((r) => setTimeout(r, 1000));
    runAnimation();
  }

  // Start animation after small delay
  setTimeout(() => runAnimation(), 500);
});
