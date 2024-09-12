/*
                vanillaJS-Slider
Copyright (C) 2024 danielamani@projectEDNA 

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */
class Joystick {
    constructor(elementId, config = {}) {
      this.config = {
        sizeBackground: config.sizeBackground || 120,
        boundSize: config.boundSize || 100,
        handleSize: config.handleSize || 16,
        minAxis: config.minAxis ?? -100,
        maxAxis: config.maxAxis ?? 100,
        step: config.step || 1,
        stickOnXAxis: config.stickOnXAxis || false,
        stickOnYAxis: config.stickOnYAxis || false,
        returnToCenter: config.returnToCenter ?? true,
        onChange: config.onChange || null, // Callback for position changes
      };
  
      this.element = document.getElementById(elementId);
      this.addDefaultStyles(); // Add default styles
      this.init();
      this.attachEvents();
    }
  
    addDefaultStyles() {
      // Check if styles are already defined
      if (!document.getElementById('joystick-styles')) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'joystick-styles';
  
        // Default CSS styles with lower specificity
        const css = `
          .joystick-container {
            position: relative;
            display: inline-block;
          }
          .joystick-bg {
            position: absolute;
            border-radius: 50%;
            background-color: #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .joystick-handle {
            position: absolute;
            border-radius: 50%;
            background-color: #444;
            cursor: pointer;
          }
        `;
  
        // Inject CSS into the <style> element
        style.appendChild(document.createTextNode(css));
  
        // Append the <style> element to the document head, before any user-defined styles
        document.head.insertBefore(style, document.head.firstChild);
      }
    }
  
    init() {
      const { sizeBackground, boundSize, handleSize } = this.config;
      const bgOffset = (sizeBackground - boundSize) / 2;
  
      this.container = document.createElement('div');
      this.container.className = 'joystick-container';
      this.container.style.width = `${sizeBackground}px`;
      this.container.style.height = `${sizeBackground}px`;
  
      this.bgCircle = document.createElement('div');
      this.bgCircle.className = 'joystick-bg';
      this.bgCircle.style.width = `${boundSize}px`;
      this.bgCircle.style.height = `${boundSize}px`;
      this.bgCircle.style.left = `${bgOffset}px`;
      this.bgCircle.style.top = `${bgOffset}px`;
  
      this.handle = document.createElement('div');
      this.handle.className = 'joystick-handle';
      this.handle.style.width = `${handleSize}px`;
      this.handle.style.height = `${handleSize}px`;
      this.resetHandlePosition();
  
      this.container.appendChild(this.bgCircle);
      this.bgCircle.appendChild(this.handle);
      this.element.appendChild(this.container);
  
      this.centerX = this.bgCircle.offsetWidth / 2;
      this.centerY = this.bgCircle.offsetHeight / 2;
      this.currentX = 0;
      this.currentY = 0;
    }
  
    attachEvents() {
      // Mouse events
      this.handle.addEventListener('mousedown', (event) => this.startDrag(event));
      document.addEventListener('mouseup', () => this.stopDrag());
      document.addEventListener('mousemove', (event) => this.onDrag(event));
  
      // Touch events
      this.handle.addEventListener('touchstart', (event) => this.startDrag(event), { passive: false });
      document.addEventListener('touchend', () => this.stopDrag());
      document.addEventListener('touchmove', (event) => this.onDrag(event), { passive: false });
    }
  
    startDrag(event) {
      this.isDragging = true;
      event.preventDefault(); // Prevent default scrolling behavior on touch devices
    }
  
    stopDrag() {
      this.isDragging = false;
      if (this.config.returnToCenter) this.resetHandlePosition();
    }
  
    onDrag(event) {
      if (!this.isDragging) return;
  
      const { boundSize, handleSize, stickOnXAxis, stickOnYAxis, minAxis, maxAxis, step, onChange } = this.config;
      const rect = this.container.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const x = clientX - rect.left - this.container.offsetWidth / 2;
      const y = clientY - rect.top - this.container.offsetHeight / 2;
  
      let dx = stickOnXAxis ? 0 : x;
      let dy = stickOnYAxis ? 0 : y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = (boundSize - handleSize) / 2;
  
      // Constrain handle to the big circle's boundary
      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx);
        dx = maxDistance * Math.cos(angle);
        dy = maxDistance * Math.sin(angle);
      }
  
      const newX = Math.round((dx / maxDistance) * ((maxAxis - minAxis) / 2) / step) * step;
      const newY = Math.round((dy / maxDistance) * ((maxAxis - minAxis) / 2) / step) * step;
  
      this.currentX = newX;
      this.currentY = newY;
  
      this.handle.style.left = `${dx + this.centerX - handleSize / 2}px`;
      this.handle.style.top = `${dy + this.centerY - handleSize / 2}px`;
  
      // Trigger the callback when the position changes
      if (typeof onChange === 'function') {
        onChange(this.getCoor());
      }
    }
  
    resetHandlePosition() {
      const { handleSize } = this.config;
      this.handle.style.left = `${this.centerX - handleSize / 2}px`;
      this.handle.style.top = `${this.centerY - handleSize / 2}px`;
      this.currentX = 0;
      this.currentY = 0;
    }
  
    getCoor() {
      return { x: this.currentX, y: this.currentY };
    }
  }
  
