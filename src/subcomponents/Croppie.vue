<template>
  <div class="form-group mt-1">
    <label class="btn border-primary text-primary btn-sm" for="imgUpload">
      <span class="d-flex align-items-center">
        <span v-html="[title ? title : 'ADD PRODUCT IMAGE']"></span>
        <i class="bi bi-image mx-1 font-weight-bold"></i>
      </span>
    </label>
    <input
      hidden
      id="imgUpload"
      ref="croppieInput"
      type="file"
      accept="image/*"
      @change="load"
      :multiple="false"
      :disabled="images.length >= max && replace"
    />
  </div>
  <div class="cr-cont" v-show="cropping">
    <div class="controls">
      <button type="button" class="btn btn-primary" @click="crop">
        <i class="bi bi-crop"></i>
      </button>
    </div>
    <div class="cr-mount" ref="croppieRef" id="item"></div>
  </div>

  <div v-if="images.length && !hideResults">
    <div class="card bg-lighter mt-1">
      <div class="card-header">
        <span
          class="float-end badge text-primary py-2 border-primary p-1 d-flex align-items-center rounded px-1"
        >
          <i class="bi bi-images mx-1"></i>
          {{ images.length }}
        </span>
        <h6 class="card-title">SELECTED IMAGES</h6>
      </div>
      <div class="card-body">
        <div class="d-flex disp-img py-1" v-for="img in images" :key="img.id">
          <div class="w-100 align-self-center">
            <p class="small m-0">{{ trimText(img.name, 32) }}</p>
            <div class="w-100">
              <button
                @click="remove(img.id)"
                type="button"
                class="btn btn-danger btn-sm mx-1"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Delete Image"
              >
                <i class="bi bi-trash"></i>
              </button>
              <button
                @click="restoreCrop(img.id)"
                type="button"
                title="Re-crop Image"
                class="btn btn-light btn-sm mx-1"
              >
                <i class="bi bi-crop"></i>
              </button>
            </div>
          </div>
          <img
            class="rounded shadow-sm"
            :src="[img.current && img.original ? img.current : img.original]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import croppie from "croppie";
import "croppie/croppie.css";
import { trimText } from "@/utils/functions";

export default {
  props: {
    config: Object,
    outputConfig: Object,
    onChange: null,
    rawImages: Array,
    edit: Boolean,
    onRemoveImage: null,
    title: null,
    onCropImage: null,
    max: Number(0),
    hideResults: Boolean,
    replace: Boolean,
  },
  data() {
    return {
      images: [],
      cropping: null,
      options: {
        viewport: { width: 500, height: 500 },
        showZoomer: false,
        enableResize: false,
        enableOrientation: true,
        ...this.config,
      },
      outputOptions: {
        quality: 1,
        size: "original",
        type: "canvas",
        format: "png", //jpeg
        ...this.outputConfig,
      },
    };
  },
  computed: {
    croppie() {
      return new croppie(this.$refs.croppieRef, this.options);
    },
  },
  methods: {
    trimText,
    crop() {
      const self = this;
      const result = self.croppie.result(self.outputOptions);
      result.then(function (result) {
        const image = self.images.find((img) => img.id === self.cropping);
        image["current"] = result;

        let images = [
          ...self.images.filter((img) => img.id !== self.cropping),
          image,
        ];

        if (self.max !== undefined && Number.isInteger(self.max))
          self.images = images.splice(-1, self.max);
        else if (self.max && !Number.isInteger(self.max))
          self.images = images[-1];
        else self.images = images;

        setTimeout(() => {
          self.cropping = null;
        }, 200);
      });
    },
    remove(id) {
      const self = this;
      if (self.cropping === id) self.cropping = null;
      const image = self.images.find((img) => img.id === id);

      if (window.confirm("Sure to delete? This action cant be reversed!")) {
        if (this.onRemoveImage) self.$emit("removeImage", image);
        self.images = self.images.filter((img) => img !== image);
      }
    },
    load: function (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const name = e.target.value.replace(/C:\\fakepath\\/gi, "");

      let reader = new FileReader();
      const self = this;

      reader.onload = function (e) {
        const result = e.target.result;
        const id = Math.random().toString(36).substring(7).toUpperCase();
        self.addImage(name, result, id);
      };
      reader.readAsDataURL(files[0]);
    },
    bind(result, id) {
      this.cropping = id;
      this.croppie.bind({ url: result });
    },
    restoreCrop(id) {
      this.cropping = id;
    },
    addImage(name, result, id) {
      if (!this.images.filter((img) => img.name === name).length) {
        const data = {};
        data["id"] = id;
        data["name"] = name;
        data["original"] = result;
        data["current"] = null;
        data["remote"] = false;

        this.images = [...this.images, data];
      }
      this.cropping = id;
    },
    resetField() {
      this.$refs.croppieInput.value = null;
    },
    openCroppie(id) {
      const imageObject = this.images.find((image) => image.id === id);
      if (!id || !imageObject) return;
      document.getElementsByTagName("html")[0].classList.add("fullscreen");
    },
    closeCroppie() {
      document.getElementsByTagName("html")[0].classList.remove("fullscreen");
    },
    sendImages() {
      if (this.onChange) this.$emit("change", this.images);
    },
    enventHandler(e) {
      if (e.code === "Escape") {
        const image = this.images.find((img) => img.id === this.cropping);
        if ((image && image.current) || image.remote === true)
          this.cropping = null;
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.enventHandler);
    this.closeCroppie();
    this.croppie.destroy();
  },
  beforeMount() {
    document.addEventListener("keydown", this.enventHandler);
  },
  watch: {
    images(val1) {
      if (val1) this.sendImages();
    },
    cropping(val1, val2) {
      if (val1 === null || !val1 || val1 === val2) {
        this.closeCroppie();
        return;
      }
      const image = this.images.find((img) => img.id === val1);
      if (image) this.bind(image.original, val1);
      this.openCroppie(val1);
      this.resetField();
    },
    rawImages(val1, val2) {
      val1.forEach((image) => {
        if (val2.find((img) => image.id === img.id)) return;
        this.images = [...this.images, image];
      });
    },
  },
};
</script>

<style scoped>
.card {
  z-index: 0 !important;
  position: initial !important;
  border-radius: 1px;
}
.controls {
  display: none;
}
.fullscreen .controls {
  display: initial;
  position: fixed;
  z-index: 2;
  right: 0.5rem;
  bottom: 0.5rem;
}
.fullscreen .cr-mount {
  position: fixed;
  z-index: 1 !important;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(38, 38, 38, 0.919) !important;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.fullscreen .cr-container {
  height: 100%;
}
.fullscreen .controls,
.cr-slider-wrap {
  background: transparent;
}

.cr-boundary {
  background: transparent !important;
  height: max-content !important;
  width: max-content !important;
}
.cr-slider-wrap {
  display: none !important;
}
.croppie-container {
  background: transparent !important;
}
.disp-img img {
  max-height: 40px !important;
}
.disp-img:not(:nth-child(1)) {
  border-top: 1px solid rgba(255, 255, 255, 0.124);
}
.disp-img:last-child:not(:nth-child(1)) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.124);
}
.cr-mount {
  padding: 0;
}
</style>

<style >
.fullscreen hr {
  color: transparent !important;
}
</style>