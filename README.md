**Collaborative Whiteboard App Documentation**

**1. Introduction**

The Collaborative Whiteboard App is a real-time drawing tool that allows users to draw, add text, and share their creations with others. The app includes basic drawing tools such as a pen, eraser, color picker, and text options. It is designed to be simple, intuitive, and responsive, with an emphasis on user experience.

**2. Features**

**Drawing Tools**
- Pen Tool: Allows users to draw freely on the canvas.
- Eraser Tool: Enables users to erase parts of their drawings.
- Text Tool: Users can add text anywhere on the canvas.
- Shape Tools: Includes options for drawing rectangles, circles, and lines.
- Color Picker: Choose a color for drawing.
- *Pen Thickness: Adjust the pen thickness using a slider.
  
**Canvas Operations**
- Undo/Redo: Allows users to undo and redo actions on the canvas.
- Clear Canvas: Clears the entire canvas, removing all drawings.
- Save Drawing: Save the current drawing as an image file (PNG format).

**Real-Time Collaboration**
- Real-time Sync: Multiple users can collaborate on the same whiteboard in real-time.
  
**3. Technologies Used**

- Frontend: 
  - HTML5: Structure of the app.
  - CSS3: Styling and layout 
  - JavaScript: Functionality, including drawing, text, and undo/redo operations.
  
**Backend**:
  - Node.js & Express.js (for handling requests and serving the app).
  - Socket.io (for real-time collaboration features).

**4. Setup Instructions**

**Frontend Setup**
1. Clone the repository:
   git clone <[repository-url](https://github.com/YadnyeshUbhad/Collaborative-Whiteboard-App.git)>
   cd collaborative-whiteboard
 
2. Open `index.html` in a web browser to start using the whiteboard app.

**Backend Setup **
1. Clone the repository:
      git clone <[repository-url](https://github.com/YadnyeshUbhad/Collaborative-Whiteboard-App.git)>
   cd collaborative-whiteboard-backend
   
2. Install Node.js dependencies:
   npm install
 
3. Start the backend server:
   npm start
   
4. Visit `http://localhost:3000` to view the whiteboard app with real-time collaboration.

**5. Usage Instructions**

**How to Use the App**
- **Drawing**: 
  - Select the **pen tool** from the toolbar to start drawing.
  - Use the **eraser tool** to erase any parts of your drawing.
  - Adjust the **pen thickness** and **color** using the slider and color picker, respectively.
  
- **Adding Text**:
  - Click on the **text tool** and click on the canvas where you want to add text.
  - Type the desired text and adjust its size, if needed.

- **Saving Your Drawing**:
  - Click the **Save** button to download the current canvas as a PNG image.

- **Undo/Redo**:
  - Click the **undo** button to revert the last action.
  - Click the **redo** button to restore the last undone action.

- **Clear Canvas**:
  - Click the **clear** button to remove everything from the canvas.

**Real-time Collaboration (Optional)**
- If backend and real-time collaboration are implemented, users will see each other's drawings live as they interact with the canvas.

**6. Project Structure**

```bash
|-- index.html                # Main HTML file (frontend)
|-- style.css                 # Styling for the whiteboard
|-- script.js                 # JavaScript code for drawing functionality
|-- README.md                 # Project documentation (this file)
|-- assets/                   # Image assets (if any)
|-- backend/                  # Backend files (if applicable)
    |-- server.js             # Backend server (Node.js/Express.js)
    |-- socket.js             # Socket.io implementation for real-time collaboration
    |-- models/               # Database models (if applicable)
        |-- drawing.js        # Drawing data model (MongoDB/Firebase)
```

 **7. Optional Features (Future Work)**

1. **User Authentication**:
   - Implement authentication for users to save and load their drawings across sessions. Consider using **JWT** and **OAuth** for login and user management.

2. **Export Drawings**:
   - Provide more export formats, such as PDF or SVG, for better interoperability with other tools.

3. **Real-Time Notifications**:
   - Notify users when someone joins or leaves a collaborative session.

4. **Drawing Tools Enhancement**:
   - Implement more advanced tools like freehand drawing, straight lines, and polygon drawing.

5. **Mobile Optimization**:
   - Ensure the app is fully responsive and optimized for mobile devices.

 **8. Troubleshooting**

- **Issue**: Canvas is not resizing on window resize.
  - **Solution**: Ensure the `resizeCanvas` function is correctly called on window resize events.

- **Issue**: Undo/Redo isn't working as expected.
  - **Solution**: Ensure the `history` and `redoStack` are correctly maintained when drawing, erasing, or clearing the canvas.
