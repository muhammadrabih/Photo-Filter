const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Filter & Effect Handlers
document.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
        if (e.target.classList.contains("brightness-add")) {
            Caman("#canvas", img, function () {
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains("brightness-remove")) {
            Caman("#canvas", img, function () {
                this.brightness(-5).render();
            });
        } else if (e.target.classList.contains("contrast-add")) {
            Caman("#canvas", img, function () {
                this.contrast(5).render();
            });
        } else if (e.target.classList.contains("contrast-remove")) {
            Caman("#canvas", img, function () {
                this.contrast(-5).render();
            });
        } else if (e.target.classList.contains("saturation-add")) {
            Caman("#canvas", img, function () {
                this.saturation(5).render();
            });
        } else if (e.target.classList.contains("saturation-remove")) {
            Caman("#canvas", img, function () {
                this.saturation(-5).render();
            });
        } else if (e.target.classList.contains("vibrance-add")) {
            Caman("#canvas", img, function () {
                this.vibrance(5).render();
            });
        } else if (e.target.classList.contains("vibrance-remove")) {
            Caman("#canvas", img, function () {
                this.vibrance(-5).render();
            });
        } else if (e.target.classList.contains("vintage-add")) {
            Caman("#canvas", img, function () {
                this.vintage().render();
            });
        } else if (e.target.classList.contains("lomo-add")) {
            Caman("#canvas", img, function () {
                this.lomo().render();
            });
        } else if (e.target.classList.contains("clarity-add")) {
            Caman("#canvas", img, function () {
                this.clarity().render();
            });
        } else if (e.target.classList.contains("sincity-add")) {
            Caman("#canvas", img, function () {
                this.sinCity().render();
            });
        } else if (e.target.classList.contains("crossprocess-add")) {
            Caman("#canvas", img, function () {
                this.crossProcess().render();
            });
        } else if (e.target.classList.contains("pinhole-add")) {
            Caman("#canvas", img, function () {
                this.pinhole().render();
            });
        } else if (e.target.classList.contains("nostalgia-add")) {
            Caman("#canvas", img, function () {
                this.nostalgia().render();
            });
        } else if (e.target.classList.contains("hermajesty-add")) {
            Caman("#canvas", img, function () {
                this.herMajesty().render();
            });
        }
    }
});

// Revert Filters
revertBtn.addEventListener("click", e => {
    Caman("#canvas", img, function () {
        this.revert();
    });
});

// Upload File
uploadFile.addEventListener("change", () => {
    // Get File
    const file = document.getElementById("upload-file").files[0];
    // Init FileReader API
    const reader = new FileReader();

    // Check For File
    if (file) {
        // Set File Name
        fileName = file.name;
        // Read Data As URL
        reader.readAsDataURL(file);
    }

    // Add Image To Canvas
    reader.addEventListener(
        "load",
        () => {
            // Create Image
            img = new Image();
            // Set Image Src
            img.src = reader.result;
            // On Image Load Add To Canvas
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                canvas.removeAttribute("data-caman-id");
            };
        },
        false);

});

// Download Event
downloadBtn.addEventListener("click", () => {
    // Get Ext
    const fileExtension = fileName.slice(-4);

    // Init New Filename
    let newFilename;

    // Check Image Type
    if (fileExtension === ".jpg" || fileExtension === ".png") {
        // New Filename
        newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
    }

    // Call Download
    download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
    // Init Event
    let e;
    // Create Link
    const link = document.createElement("a");

    // Set Props
    link.download = filename;
    link.href = canvas.toDataURL("image/jpeg", 0.8);
    // New mouse event
    e = new MouseEvent("click");
    // Dispatch Event
    link.dispatchEvent(e);
};