🌟 Memory Game Task Planner and Algorithms

-> Screens:
1) Start screen ✅
2) Game screen

-> Start screen:
1) Has a card ✅
2) Card has a "select theme" option ✅
3) Card has a "number of players" option ✅
4) Card has a "grid size" option ✅
5) Card has a "start game" button ✅

-> Game screen:
1) Has a heading on left ✅
2) Has a pair of buttons on right ("Restart" and "New Game")
3) Has the main grid of circles ✅
4) Has a timer + moves or number of players count
5) Has a dialog with end results (different for single and multi player modes)

-> Icons chosen:

Boat, Cable-car, Cat, Cake, Cone, Dice, Dragon, Flask, Fork, Fox, Gamepad, Ghost,
Infinite, Lemon, Masks, Snowflake, TV, Umbrella

-> Grid of circles:
1) Can be a 4x4 or 6x6 grid ✅
2) Can be numbers or icons ✅
3) Consists of elements (numbers or icons) in pairs ✅
4) All the elements should be randomly ordered ✅

⭐️ Algorithm used for shuffle - Modern version of Fisher-Yates

Logic behind the grid circles ->
1) Should have a "found tiles" collections for tiles successfully found ✅
2) Temporarily save 2 tiles for comparison ✅
3) If the two tiles match (not the same tile clicked twice), move them to found tiles ✅
4) Else clear out the 2 temporarily saved tiles ✅

Logic behind the timer ->
1) Values should be string ✅
2) Timer state object should have a minute and a second value ✅
3) Should begin counting once the game begins ✅
4) If seconds are 59, reset seconds to 0, and increment minutes by 1
5) If minutes are less than 10, add a zero before them
6) If seconds are less than 10, add a zero before them
7) Return updated minutes and seconds

Logic behind multiplayer ->
1) For multiplayer, no timer should be set
2) Assign an id and score to the number of players
3) Chance to play starts from 1 to n and then repeat
4) Player who successfully matches a pair gets an additional chance to play
5) Player who fails to match a pair gets one chance only
6) After the player has played their chance, the next player in line gets the chance to play
7) The player with the most successful matches wins
8) Draw is also possible

Extras -

⭐️ Can have an indication for when the game begins

⭐️ Should end the game if the player takes too long (longer than 10 minutes)
