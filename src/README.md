# **Task Planner and Algorithms**

## **🌟 Required elements and their behaviour**

**Screens -**
- [x] Start screen
- [x] Game screen

**Start screen -**
- [x] Has a card 
- [x] Card has a heading with app title
- [x] Card has a `Select theme` option
- [x] Card has a `Number of players` option
- [x] Card has a `Grid size` option
- [x] Card has a `Start game` button

**Game screen -**
- [x] Has a heading with app logo and title on left
- [x] Has a pair of buttons on right (`Pause` and `New Game`)
- [x] Has the main grid of tiles <br>
    - [x] Grid size can either be `4x4` or `6x6` tiles <br>
    - [x] Tiles can be `icons` or `numbers` <br>
    - [x] Tiles are present in pairs, for a total of `n` tiles in the grid, there would be `n/2` unique tiles <br>
    - [x] Tiles are randomly ordered (modern version of Fisher-Yates Algorithm used for random shuffle)
- [x] Has player stats boxes <br>
    - [x] For single-player, stats are `Time` elapsed and `Moves` taken <br>
    - [x] For multi-player, stats are players with their individual `Score` of successfully matched pairs
- [x] Has pause dialog with `Resume`, `Restart` and `New Game` buttons
- [x] Has results/game over dialog <br>
    - [x] Has a title and a description (varies depending on game mode as well as result)
    - [x] Single-player results showcase `Time` and `Moves` needed <br>
    - [x] Multi-player results list all the players with their final scores, and highest scorers declared `Winner`.

## **🌟 Logic, algorithm and problem solving approach**

**Tile matching and visibility -**
1) Create a `found tiles` collection for storing successfully paired tiles' `label`
2) Create a `temporary tiles` collection to store up to two temporary tiles
3) Temporary tiles should have an `id` and a `label` attribute each
4) When a tile is clicked, check the `temporary tiles` collection
5) If there are 0 tiles in it, add the clicked tile as the first tile in the collection
6) If there is 1 tile in it, compare the `id` of that tile with the `id` of clicked tile
7) If the `id`s are unique, add the clicked tile as the second tile in the collection
8) Compare the `label` of the two tiles in `temporary tiles` collection
9) If there is a match, add the `label` to `found tiles` collection
10) Empty the `temporary tiles` collection after comparison is done

Trivia - The tiles whose `label` is present in `found tiles` and the tiles whose `id` is present in `temporary tiles`, these tiles would be visible to the player. Step 6 and 7 ensure that there is no effect if the same tile is clicked multiple times.

**Single-player timer -**
1) Create a variable called `startTime` which initially equates to `Date.now()`
2) Set interval that runs every second, and calculates `Date.now() - startTime`
(this is supposedly more accurate and reliable than simply starting a count from 0 and incrementing at every interval cycle, because if the interval becomes faster or slower for any reason, the count becomes inaccurate)
3) If `seconds` are 59, reset `seconds` to 0, increment `minutes` by 1, and re-evaluate `startTime` as `Date.now()` at present time
4) If `seconds` are less than 10, add a zero before them
5) For game pause/completion, stop the count by clearing interval

Trivia - Timer starts only after the game begins (when a tile is clicked). If the timer reaches 10 minutes, the game is declared as timed out, and the result up to that point is displayed. Game over by time running out is only possible in single-player.

**Multiplayer -**
1) Assign an `id` and a `score` (initially 0) to each player
2) Chance to play starts from `player 1` to `player n` and the cycle repeats once the `nth` player had their chance
3) If a player successfully matches a pair of tiles, they get an additional chance to play, and their `score` is incremented by `1`
4) If a player fails to match a pair, their score remains unchanged, and the chance goes to the next player in line
5) If there is a single player with the highest score, that player is declared as the undisputed winner
6) If multiple players hold the highest score, each high scorer is declared as a winner, and the game ends in a draw

Trivia - There is no timer in multiplayer, hence no time limit. This is part of the design and not my personal idea. Though a timer addition could be interesting in multiplayer, it is not in my immediate plans for this app.

## **🌟 Extras**

**Icons chosen -**

Cat, Cake, Cone, Dice, Dragon, Flask, Fork, Fox, Gamepad, Ghost, Infinity, Leaf, Lemon, Masks, Money, Snowflake, Retro TV, Umbrella

**Further ideas -**

- [ ] Can have an indication for when the game begins
- [x] Should end the game if the player takes too long (longer than 10 minutes)
- [x] Can have sound feedback on successful tile match
