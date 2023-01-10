---
title: 'Synsong'
socialImage: images/synsong.png
date: '2021-12-16'
tags:
  - project
  - python
summary: "I just somewhat finished the beta of a project (synsong) to practice NLP, Python, and API skills. Right now, you can input genre, popularity, and a natural language prompt (such as a sentence, quote, or paragraph), and it will create a playlist based on matches with the lyrics, song title, and artist name with the prompt."
---

### TLDR:

I just somewhat finished the beta of a project (synsong) to practice NLP, Python, and API skills. Right now, you can input genre, popularity, and a natural language prompt (such as a sentence, quote, or paragraph), and it will create a playlist based on matches with the lyrics, song title, and artist name with the prompt. Eventual goals are to practice model training to auto-detect genres, do some topic modeling with larger prompts, and maybe even have an option for mood. 

---

## The Beginnings

The beginnings of synsong have been super fun. It started with the idea, to make a playlist from a sentence, and ended with a whole bunch of other playlist customizations, such as genre and popularity. I made the backend first, and then also created the website. 

### The Backend

The backend is written in Python, and uses spaCy for all the NLP. I started out by getting the title, spaCy gets the noun phrases by looking at dependencies (`nsubj` or `pobj`) or heads (`lemma_ == "be"`). The constituents that are searched in the lyrics are found using spaCy's `.noun_chunks` function. For both the title and the constituents, a random sample is taken (1 for the title and 5 for the constituents). 

The constituents are then put in a series of lists with differing amounts of items to ensure that relevant but enough results come up. 

```python
# prompt: Potatoes are great food for worms and bugs in the ground.

[['potato', 'great food', 'worm', 'bug', 'ground'], ['great food', 'bug', 'ground'], ['worm', 'bug', 'ground'], ['potato', 'great food', 'worm', 'bug'], ['potato', 'worm', 'bug', 'ground'], ['great food', 'worm', 'bug', 'ground'], ['potato'], ['great food'], ['worm'], ['bug'], ['ground']]
```

The lists are then formatted and searched through the [Musixmatch](https://musixmatch.com) database with the inputted genre and popularity filters. If there's more than 30 songs, the code will just take the first 30, which are probably the most relevant ones due to the ordering of the search. 

I then used [Spotipy](https://spotipy.readthedocs.io/en/2.19.0/#) to link the user's Spotify account and make a playlist on their behalf. 

That's basically it! You can find all the code in the [GitHub](https://github.com/victorialslocum/synsong). 

### The Frontend

The website is powered by [Flask](https://flask.palletsprojects.com/en/2.0.x/), a Python web framework, and [Bulma](https://bulma.io), a CSS framework, and then deployed with [Railway](https://railway.app). 

### Demo

Synsong starts on the home page, where it will prompt you to “get started” to log in with your Spotify or “go to app” if you’ve already logged in. 

![synsong_home.jpg](/images/synsong_home.jpg)

You’ll then go to the generator page...

![synsong_generator.jpg](/images/synsong_generator.jpg)

And then you can input your prompt, genres, and other settings!

![synsong_generator_filled.jpg](/images/synsong_generator_filled.jpg)

You’ll get a playlist (it takes awhile to load though) on the page after, and you can also see it in your Spotify account. 

![synsong_yourplaylist.jpg](/images/synsong_yourplaylist.jpg)

And that’s that!!

### Future plans and known issues

I would love to have a whole other aspect of machine learning so I can work on those skills, and one way I’ve thought about doing that is through genre detection. I’d also love to try my hand at topic modeling for larger prompts. 

Right now, the popularity filter isn’t too tuned and I’m at a bit of a risk for making too many API requests with Musixmatch’s free plan. Also the footer isn’t stuck to the bottom. Besides that, [let me know](https://github.com/victorialslocum/synsong/issues) if you find any other issues!

### Links

Thanks for reading! I’m Victoria ([victoriaslocum.com)](https://victoriaslocum.com), and you can find this projects website at [synsong.app](https://synsong.app) and the GitHub [here](https://github.com/victorialslocum/synsong).