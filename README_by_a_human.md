Project details
================

This README is written by human and has the implementation details of the project.

## Image creation
The images were created using the [openart.ai](https://openart.ai/). These are the details of the images.

#### Model
The model was used is the `Pixar Style XL`.

#### Prompt
The prompt for the image was as follows:
```
(`character`), wearing short sleeves, (flat illustration), vibrant colors, cartoon style, vector graphics, confident expression, bright background, fun and engaging vibe, emphasizing strength and progress, high-quality design, appealing for all ages, modern aesthetic, no other characters around.
```

were `character` is the character to be created and this is the list of characters I've used:
- `girl police office` & `boy police officer`
- `girl chef` & `boy chef`
- `girl firefighter` & `boy firefighter`
- `girl doctor` & `boy doctor`
- `girl scientist` & `boy scientist`
- `girl astronaut` & `boy astronaut`
- `girl teacher` & `boy teacher`
- `girl construction worker` & `boy construction worker`
- `girl farmer` & `boy farmer`
- `girl car mechanic` & `boy car mechanic`
- `girl runner` & `boy runner`
- `girl playing with a toy truck` & `boy playing with doll`
- `girl truck driver` & `boy truck driver`
- `girl musician` & `boy musician`
- `girl taking care of baby` & `boy taking care of baby`
- `girl soccer player` & `boy soccer player`
- `girl vacuuming a room` & `boy vacuuming a room`
- `girl washing the dishes` & `boy washing the dishes`
- `girl playing chess` & `boy playing chess`
- `girl ballet dancer` & `boy ballet dancer`
- `girl taxi driver` & `boy taxi driver`
- `girl lifting weights in the gym` & `boy lifting weights in the gym`

## Code implementation
I've used the Anthropic's Claude 3.5 Sonnet model to generate the code implementation of the project.
First I've input the specifications of the game in the model and then requested the model to draft a project
detailed project specifications document that is compatible with the LLMs' capabilities and it can be used as
a reference from the LLM to build the code.

The result specifications document is [this one](./equality-pairs-specification.md).

Then I've used [claude-dev](https://github.com/schardosin/claude-dev) with visual studio code and feed the model
with the prompt to generate the code implementation of the project. The boilerplate code that was generated was
partially working but it took several iterations to make it work as expected.

The model wasn't able to resolve business logic issues and I had to find the bug my self and then point the model
to fix it. One example was that when a the first pair was matched then the game was over and the user was not able
to continue playing. I've found the bug and then pointed the model to fix it.
