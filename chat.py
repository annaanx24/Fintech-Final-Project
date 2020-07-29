import random

# return responses based on kewords

def chatResponse(userMessage):

  num = random.randint(0, 10)
  print(num)

  responses= {
    "greetings": {
      0: "Hey how are you?",
      1: "Bonjour",
      2: "Ciao",
      3: "Hello",
      4: "Hi",
      5: "Good morning",
      6: "Good afternoon",
      7: "Good evening",
      8: "Nihao",
      9: "Nice to meet you",
      10: "It's a pleasure to meet you"
       
    },
    
    "farewells": {
      0: "Bye",
      1: "Au revoir",
      2: "Goodbye",
      3: "See you later",
      4: "Later",
      5: "See you tomorrow",
      6: "I'm off",
      7: "Have a good day",
      8: "Bye Bye",
      9: "It was nice to meet you",
      10: "Peace out"
    },

    "moneyFacts": {
      0: "Money is used to pay for various goods and services.",
      1: "Money usually takes the form of coins, banknotes and bank balances.",
      2: "It is believed that products such as livestock and grain were used to barter (exchange goods and services without the use of money) over 10000 years ago",
      3: "Paper money was first used in China over 1000 years ago.",
      4: "Credit cards were first used in the United States in the 1920’s.",
      5: "The US dollar and many other currencies use the dollar sign $ as a symbol.",
      6: "The U.S. Congress passed the Mint Act in 1792, which was the beginning of the nation's new currency system using coins and dollars.",
      7: "People created money to use for trading.",
      8: "Insert money fact here",
      9: "Insert money fact here",
      10: "Insert money fact here"
    },
  }

  # All have to be lowercase for comparison
  greets = ["hello", "hi", "hey"]
  bye = ["bye", "see you", "goodbye"]
  waste = ["fact", "money", "learn"]
  
  for i in greets:
    if userMessage.find(i) >=0:
      return responses['greetings'][num]
  
  for i in bye:
    if userMessage.find(i) >=0:
      return responses['farewells'][num]

  for i in waste:
    if userMessage.find(i) >=0:
      return responses['moneyFacts'][num]

