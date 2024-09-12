# vanillaJS-Joystick
A simple implementation for joystick that using vanilla JS for joystick. No need external library, easy to use.

## To-Do
- [ ] Versioning
- [ ] Add more data like postion (CW,W)
- [ ] Testing edge cases
- [ ] Adding more info, picture and tryme webpage

## How to use it

First, include the necessary `joystick.js` file and create a unique `<div>` for each joystick instance.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Joystick Example</title>
    <!-- Include the joystick.js file -->
    <script src="joystick.js"></script>
</head>
<body style="background-color: #2f2d5a; color: white;">
    <h2>Basic Joystick</h2>
    <div id="joystick1Div"></div>

    <h2>Advanced Joystick</h2>
    <div id="joystick2Div"></div>

    <script>
        // Create a basic joystick
        const joystick1 = new Joystick('joystick1Div');

        // Create an advanced joystick with custom configuration
        const joystick2 = new Joystick('joystick2Div', {
            sizeBackground: 150, 
            boundSize: 120, 
            handleSize: 20,
            minAxis: -50,
            maxAxis: 50,
            step: 2,
            stickOnXAxis: false,
            stickOnYAxis: false,
            returnToCenter: true,
            onChange: (coordinates) => {
                console.log(`Joystick 2 Coordinates: X = ${coordinates.x}, Y = ${coordinates.y}`);
            }
        });
    </script>
</body>
</html>
```

### Explanation:

1. **Include the Joystick JavaScript File**:
   - Include the necessary `joystick.js` file with the `<script>` tag: `<script src="joystick.js"></script>`.

2. **Create Unique Divs for Each Joystick**:
   - Add a unique `<div>` for each joystick you want to create: `<div id="joystick1Div"></div>` and `<div id="joystick2Div"></div>`.

3. **Initialize the Joystick**:
   - Create a new instance of the `Joystick` class for each joystick, specifying the unique ID of the `<div>` where the joystick will be rendered.

### Advanced Configuration for Joystick

You can customize the joystick by passing various parameters to the constructor. Here is an example with an advanced configuration:

```javascript
<script>
    // Create an advanced joystick
    const advancedJoystick = new Joystick('joystick2Div', {
        sizeBackground: 200,        // Size of the joystick container in pixels
        boundSize: 150,             // Diameter of the joystick background circle
        handleSize: 30,             // Diameter of the joystick handle
        minAxis: -100,              // Minimum axis value
        maxAxis: 100,               // Maximum axis value
        step: 5,                    // Step increment for joystick values
        stickOnXAxis: false,        // Allow movement on X-axis
        stickOnYAxis: true,         // Allow movement on Y-axis only
        returnToCenter: false,      // Joystick does not return to center when released
        onChange: (coordinates) => {
            console.log(`Advanced Joystick Coordinates: X = ${coordinates.x}, Y = ${coordinates.y}`);
        }
    });
</script>
```

Example for Sending Joystick Values Periodically

```javascript
function sendJoystickValue() {
    const joystickValue = joystick2.getCoor(); // Get current coordinates of the joystick

    fetch('/joystick-value', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ x: joystickValue.x, y: joystickValue.y }) // Send joystick coordinates as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Send the joystick value every 5 seconds
setInterval(sendJoystickValue, 5000);
```

## Type

 **`Joystick`**
  - The joystick object

## Parameter List
All paramter are optional, no need to declare if not use or need to change. See Default for each parameter for more informations. The paramters no need in spesific order.

1. **`sizeBackground: {int}`**

   - **Default**: `120`
   - **Usage**: Specifies the size of the square canvas that contains the joystick, in pixels. This will create a canvas of `sizeBackground x sizeBackground` pixels.

2. **`boundSize: {int}`**

   - **Default**: `100`
   - **Usage**: Specifies the diameter of the big circle, which serves as the boundary for the joystick handle, in pixels.

3. **`handleSize: {int}`**

   - **Default**: `16`
   - **Usage**: Specifies the diameter of the small circle (the joystick handle) that the user can drag, in pixels.

4. **`minAxis: {int}`**

   - **Default**: `-100`
   - **Usage**: Sets the minimum value for both the X and Y axes of the joystick. The joystick will output values between `minAxis` and `maxAxis`.

5. **`maxAxis: {int}`**

   - **Default**: `100`
   - **Usage**: Sets the maximum value for both the X and Y axes of the joystick. The joystick will output values between `minAxis` and `maxAxis`.

6. **`step: {int}`**

   - **Default**: `1`
   - **Usage**: Specifies the increment step for the joystick values. This defines the resolution or sensitivity of the joystick movement. Smaller steps provide more fine-grained control.

7. **`stickOnXAxis: {bool}`**

   - **Default**: `false`
   - **Usage**: If set to `true`, the joystick handle will only move along the X-axis and ignore the Y-axis movements.

8. **`stickOnYAxis: {bool}`**

   - **Default**: `false`
   - **Usage**: If set to `true`, the joystick handle will only move along the Y-axis and ignore the X-axis movements.

9. **`returnToCenter: {bool}`**

   - **Default**: `true`
   - **Usage**: If set to `true`, the joystick handle will return to the center of the big circle when the user releases it. If `false`, the handle will stay in its current position when released.

10. **`onChange: {function}`**

    - **Default**: `null`
    - **Usage**: A callback function that is triggered whenever the joystick position changes. This function receives the current coordinates `{ x, y }` of the joystick handle as an argument.

## Acknowledgements

Special thanks to the contributors and the open-source community for their continuous support. Thanks to Nakamoto Albert for supporting with ProjectEDNA.
