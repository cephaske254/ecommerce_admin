export default {
  trimText,
  load(e) {
    window.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        document.getElementsByTagName("html")[0].classList.remove("fullscreen");
      }
    });
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    const name = e.target.value.replace(/C:\\fakepath\\/gi, "");

    const self = this;
    let reader = new FileReader();

    reader.onload = function(e) {
      self.croppieImage = e.target.result;
      self.addImage(self.croppieImage, name);
      self.croppie.bind({
        url: self.croppieImage,
      });
    };
    reader.readAsDataURL(files[0]);
    document.getElementsByTagName("html")[0].classList.add("fullscreen");
  },
  crop() {
    const self = this;

    const result = self.croppie.result(self.options);
    result
      .then((data) => {
        // self.addImage(data);
        console.log(data);
      })
      .finally(this.resetField());
    document.getElementsByTagName("html")[0].classList.remove("fullscreen");
  },
  addImage(image, name) {
    const data = { id: null, original: image, current: null, name: null };

    const available = this.images.filter((img) => img["name"] === name);

    if (available && !available.length) {
      data["id"] = Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase();
      data["name"] = name;
      this.images.push(data);
    }
  },
  resetField() {
    this.$refs.croppieInput.value = null;
  },
};
