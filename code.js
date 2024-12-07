figma.showUI(__html__, { width: 800, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-text') {
    const nodes = [];
    
    // Create text node
    const text = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    
    text.characters = msg.text;
    text.textAutoResize = "HEIGHT";
    text.x = figma.viewport.center.x;
    text.y = figma.viewport.center.y;
    
    nodes.push(text);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'insert-logo') {
    try {
      const response = await fetch(msg.logoUrl);
      const svgString = await response.text();
      
      const node = figma.createNodeFromSvg(svgString);
      node.x = figma.viewport.center.x;
      node.y = figma.viewport.center.y;
      
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    } catch (error) {
      figma.notify('حدث خطأ أثناء إدراج الشعار');
    }
  }
};
