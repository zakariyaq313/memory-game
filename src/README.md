# **Task Planner and Algorithms**

## **🌟 Required elements and their behaviour**

**Screens -**
- [x] Start screen
- [x] Game screen

**Start screen -**
- [x] Has a card 
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

<br>

## **🌟 Logic and algorithm**

**Logic behind tile matching and visibility -**
1) Create a `found tiles` collection for storing successfully paired tile labels
2) Create a `temporary tiles` collection to store up to two temporary tiles
3) Temporary tiles should have an `id` and a `label` attribute each
4) When a tile is clicked, check the `temporary tiles` collection
5) If there are 0 tiles in it, add the clicked tile as the first tile in the collection
6) If there is 1 tile in it, compare the `id` of that tile with the `id` of clicked tile
7) If the `id`s are unique, add the clicked tile as the second tile in the collection
8) Compare the `label` of the two tiles in `temporary tiles` collection
9) If there is a match, add the `label` to `found tiles` collection
10) Empty the `temporary tiles` collection after comparison is done

Trivia - The tiles whose `label` is present in `found tiles` and the tiles whose `id` is present in `temporary tiles`, these tiles would be visible to the player. Step 6 and 7 ensure that there is no effect if the same tile is clicked twice.

**Logic behind singleplayer timer -**
1) Should begin the count only after the game begins (a tile is clicked)
2) Should pause the count when game is paused, and resume the count when game is resumed
3) Create a variable called `startTime` which equates to `Date.now()`
4) Set interval that runs every second, and calculates `Date.now() - startTime`
(This is supposedly more accurate and reliable than simply starting a count from 0 and incrementing at every interval cycle, because if the interval becomes faster or slower for any reason, the count is not inaccurate.)
5) If seconds are 59, reset `seconds` to 0, increment `minutes` by 1, and re-evaluate `startTime` as `Date.now()` at present time
6) If seconds are less than 10, add a zero before them
7) For game pause/completion, stop the count by clearing interval which sets the time

**Logic behind multiplayer -**
1) For multiplayer, no timer should be set
2) Assign an `id` and a `score` (initially 0) to each player
3) Chance to play starts from `player 1` to `player n` and the cycle repeats once the `nth` player had their chance
4) If a player successfully matches a pair of tiles, they get an additional chance to play, and their `score` is incremented by `1`
5) If a player fails to match a pair, their score remains unchanged, and the chance goes to the next player in line
6) If there is a single player with the highest score, that player is declared as the winner
7) If multiple players have the highest score, each high scorer is declared as a winner, and game ends in a draw

<br>

## **🌟 Extras**

**Icons chosen -**

Cat, Cake, Cone, Dice, Dragon, Flask, Fork, Fox, Gamepad, Ghost, Infinity, Leaf, Lemon, Masks, Money, Snowflake, Retro TV, Umbrella

**Further ideas -**

- [ ] Can have an indication for when the game begins
- [x] Should end the game if the player takes too long (longer than 10 minutes)
