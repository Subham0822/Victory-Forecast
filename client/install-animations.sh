#!/bin/bash

# Install ReactBits components and animations
echo "Installing ReactBits animations and components..."

# Required components
npx jsrepo add https://reactbits.dev/ts/default/Components/ElasticSlider
npx jsrepo add https://reactbits.dev/ts/default/Backgrounds/PixelBlast

# Text animations
npx jsrepo add https://reactbits.dev/ts/default/TextAnimations/SplitText
npx jsrepo add https://reactbits.dev/ts/default/TextAnimations/BlurText
npx jsrepo add https://reactbits.dev/ts/default/TextAnimations/TextType
npx jsrepo add https://reactbits.dev/ts/default/TextAnimations/CountUp

# Animations
npx jsrepo add https://reactbits.dev/ts/default/Animations/TargetCursor

# Components
npx jsrepo add https://reactbits.dev/ts/default/Components/ChromaGrid
npx jsrepo add https://reactbits.dev/ts/default/Components/ScrollStack
npx jsrepo add https://reactbits.dev/ts/default/Components/BubbleMenu

# Backgrounds
npx jsrepo add https://reactbits.dev/ts/default/Backgrounds/Aurora
npx jsrepo add https://reactbits.dev/ts/default/Backgrounds/Particles

echo "Installation complete!"

