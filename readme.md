Forked project from [here](https://github.com/bradtraversy/vanillawebprojects/tree/master/typing-game)

*Modifications*
1. Changed game rules. The game now tracks each letter typed and gives you a word per minute score.
2. Modified difficulties. Easy gives no penalty, while each typo in medium/hard removes 1/2 seconds from time.

*Improvements*
1. The game now starts when you start typing instead of on load.
2. Changing difficulty during the game now starts the game over.

*Dependencies*
1. Removed Font Awesome dependancy (55kb), and used html code to display gear icon.

## Speed Typer Typing Game

Game to beat the clock by typing random words

## Project Specifications

- Create game UI including a difficuly setting
- Generate random word and place in DOM
- Score increase after word is typed
- Implement timer
- Add certain amount of time after word is typed based on difficulty
- Store difficulty setting in local storage
