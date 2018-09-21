if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
}

document.addEventListener('tizenhwkey', function(e) {
  if (e.keyName === 'back') {
    try {
      tizen.application.getCurrentApplication().exit();
    } catch (error) {}
  }
});

var context = canvas.getContext('2d');

var reachedEdge = false;
var touchStart = null;
var touchDown = false;

var lastTouchTime = 0;
pageElement.addEventListener('touchstart', function(e) {
  touchDown = true;

  if (e.timeStamp - lastTouchTime < 500) {
    lastTouchTime = 0;
    toggleZoom();
  } else {
    lastTouchTime = e.timeStamp;
  }
});

pageElement.addEventListener('touchmove', function(e) {
  if (pageElement.scrollLeft === 0 ||
    pageElement.scrollLeft === pageElement.scrollWidth - page.clientWidth) {
    reachedEdge = true;
  } else {
    reachedEdge = false;
    touchStart = null;
  }

  if (reachedEdge && touchDown) {
    if (touchStart === null) {
      touchStart = e.changedTouches[0].clientX;
    } else {
      var distance = e.changedTouches[0].clientX - touchStart;
      if (distance < -100) {
        touchStart = null;
        reachedEdge = false;
        touchDown = false;
        onNextPage();
      } else if (distance > 100) {
        touchStart = null;
        reachedEdge = false;
        touchDown = false;
        onPrevPage();
      }
    }
  }
});

pageElement.addEventListener('touchend', function(e) {
  touchStart = null;
  touchDown = false;
});

var pdfFile = null,
	pageRendering = false,
    pageNumPending = null,
	pageNum = 1;
	
/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfFile.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

var zoomed = false;
var toggleZoom = function () {
  zoomed = !zoomed;
  renderPage(pageNum);
};

var fitScale = 1;

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(pageNumber) {
	pageRendering = true;
	
	var scale = zoomed ? fitScale : 1;

	pdfFile.getPage(pageNumber).then(function(page) {
		viewport = page.getViewport(1);

		if (zoomed) {
			// var scale = pageElement.clientWidth / viewport.width;
			viewport = page.getViewport(scale);
		}

		canvas.height = viewport.height;
		canvas.width = viewport.width;

		// Render PDF page into canvas context
		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		var renderTask = page.render(renderContext);
		
		// Wait for rendering to finish
		renderTask.promise.then(function() {
			pageRendering = false;
			if (pageNumPending !== null) {
				// New page rendering is pending
				renderPage(pageNumPending);
				pageNumPending = null;
			}
		});
	});
	
	// Update page counters
	document.getElementById('page_num').textContent = pageNumber;
	document.getElementById('zoom_level').textContent = fitScale * 100;
};

function onZoomIn() {
	zoomed = true;
	fitScale = fitScale + 0.25;
	
	queueRenderPage(pageNum);
}

function onZoomOut() {
	zoomed = true;
	fitScale = fitScale - 0.25;
	
	queueRenderPage(pageNum);
}

navElement.closest('nav').find('.prev').click( onPrevPage );
navElement.closest('nav').find('.next').click( onNextPage );
navElement.closest('nav').find('.zoomin').click( onZoomIn );
navElement.closest('nav').find('.zoomout').click( onZoomOut );

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

pdfjsLib.disableStream = true;
/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).then(function(pdf) {
  pdfFile = pdf;
  document.getElementById('page_count').textContent = pdfFile.numPages;

  // Initial/first page rendering
  renderPage(pageNum, 1);
});
