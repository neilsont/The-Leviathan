# ThinkTank
Developed an interactive browser-based word-guessing game using HTML, C++, and JavaScript. The game dynamically fetches random phrases from an external API and challenges players to guess the phrase within a limited number of attempts. 

## Console version — *The Kraken* (`thinktank.c++`)

The original game, written in C++ before the browser port: a phrase-guessing loop where every wrong letter
costs 10 hitpoints and the planet-eating kraken advances through six full-screen ASCII-art stages.

```bash
g++ -std=c++11 -o thinktank thinktank.c++ && ./thinktank
```
