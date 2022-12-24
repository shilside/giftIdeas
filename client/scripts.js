document
  .getElementById("chatbot-start-button")
  .addEventListener("click", function () {
    // Hide start button
    this.style.display = "none";

    // Show loading animation
    const loadingDots = document.createElement("div");
    loadingDots.innerHTML = "&#8226;&#8226;&#8226;";
    loadingDots.style.fontSize = "40px";
    loadingDots.style.textAlign = "center";
    document.getElementById("loadingdots").appendChild(loadingDots);

    // Run main function
    main().then(() => {
      // Remove loading animation
      loadingDots.remove();

      // Show start button
      this.style.display = "block";
    });
  });

async function getRecommendations(prompt) {
  const response = await fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      prompt,
      model: "text-davinci-002",
      temperature: 0.5,
    }),
  });
  const jsonResponse = await response.json();
  return jsonResponse.choices[0].text;
}

async function askQuestion(question) {
  // Display question in chatbot messages
  const chatbotMessage = document.createElement("div");
  chatbotMessage.innerText = question;
  document.getElementById("chatbot-messages").appendChild(chatbotMessage);

  // Show form
  document.getElementById("chatbot-form").style.display = "block";
  // Wait for user to submit their response
  const response = await new Promise((resolve) => {
    document
      .getElementById("chatbot-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        resolve(document.getElementById("chatbot-input").value);
        this.reset();
      });
  });

  // Hide form
  document.getElementById("chatbot-form").style.display = "none";

  // Display user's response in chatbot messages
  const userMessage = document.createElement("div");
  userMessage.innerText = response;
  document.getElementById("chatbot-messages").appendChild(userMessage);

  return response;
}

async function main() {
  // Greet user
  const greeting = await getRecommendations(
    "Hello! I am Santana, your personal gift recommendation chatbot. How can I help you today?"
  );
  const message = document.createElement("div");
  message.innerText = greeting;
  document.getElementById("chatbot-messages").appendChild(message);

  // Get user's interests
  const interests = await askQuestion("What are you interested in?");
  const age = await askQuestion("How old are you?");

  // Get user's gender
  const gender = await askQuestion("What is your gender?");

  // Get user's nationality
  const nationality = await askQuestion("What is your nationality?");

  // Get user's vibe
  const vibe = await askQuestion(
    "What is your vibe? (e.g. cool, stylish, edgy, etc.)"
  );

  // Get user's career
  const career = await askQuestion("What is your career?");

  // Get user's hobby
  const hobby = await askQuestion("What is your hobby?");

  // Get gift the user might like
  const gift = await askQuestion("Is there a specific gift you might like?");

  // Get user's tech savviness
  const techSavvy = await askQuestion("Are you tech savvy?");

  // Get user's price range
  const priceRange = await askQuestion("What is your price range?");

  // Get recommendations
  const prompt = `I am interested in finding gift recommendations for someone who is ${age}, ${gender}, ${nationality}, and has a vibe of ${vibe}. They are interested in ${interests} and their career is ${career}. They enjoy ${hobby} and might like a gift related to ${gift}. They are ${techSavvy} when it comes to technology and have a price range of ${priceRange}. Can you help me find some gift recommendations?`;
  const recommendations = await getRecommendations(prompt);
  const message2 = document.createElement("div");
  message2.innerText = recommendations;
  document.getElementById("chatbot-messages").appendChild(message2);
}
