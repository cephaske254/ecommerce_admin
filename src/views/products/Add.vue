<template>
  <div class="container add-cont mt-3">
    <form @submit="submit">
      <div class="row">
        <div class="col-md-6 h-100">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Product Name</label>
              <span class="required"></span>
              <input
                id="name"
                v-model="name"
                class="form-control"
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="category">Category</label>
                <span class="required"></span>
                <input
                  id="category"
                  v-model="category"
                  type="text"
                  class="form-control"
                  placeholder="Category"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="brand">Brand</label>
                <input
                  placeholder="Product brand"
                  v-model="brand"
                  id="brand"
                  type="text"
                  class="form-control"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="price">Price</label>
                <span class="required"></span>
                <input
                  placeholder="Price in KES"
                  v-model="price"
                  id="price"
                  type="number"
                  min="0"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>

              <span class="required"></span>
              <ckeditor
                :editor="editor"
                v-model="description"
                :config="editorConfig"
              ></ckeditor>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="images">Product Images</label>
            <span class="required"></span>
          </div>
          <croppie :onChange="(data) => (images = data)" />
        </div>
        <div class="col-12">
          <button
            type="submit"
            :disabled="!valid"
            class="btn btn-info mb-2 float-end"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </form>
    <div class="container-fluid uploading-cont bg-dark" v-if="uploading">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-6 col-lg-4 col-sm-10 d-block">
          <div class="progress border border-info">
            <div
              class="progress-bar progress-bar-stripped bg-info"
              :aria-valuenow="progress"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{ width: progress + '%' }"
            >
              {{ progress + "%" }}
            </div>
          </div>
          <p class="text-white small text-center">UPLOADING IMAGES...</p>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { component as ckeditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Croppie from "@/subcomponents/Croppie.vue";
import * as types from "@/store/types";

const defaults = {
  name: "Product another",
  category: "phones & accessories",
  brand: "oraimo",
  price: "16424",
  description: "<p>description here</p>",
  available: true,
};

export default {
  beforeMount() {
    const self = this;
    if (!self.submitted) {
      window.addEventListener("beforeunload", self.preventNav);
    }
  },

  components: { ckeditor, Croppie },
  data: () => ({
    editor: ClassicEditor,

    name: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    available: true,
    images: [],
    submitted: false,
    ...defaults,
    progress: 0,
    uploading: false,

    editorConfig: {
      toolbar: {
        items: [
          "heading",
          "bold",
          "italic",
          "link",
          "undo",
          "redo",
          "numberedList",
          "bulletedList",
          "indent",
          "outdent",
          "blockquote",
        ],
      },
    },
  }),
  computed: {
    valid() {
      if (
        this.name &&
        this.category &&
        this.brand &&
        this.description &&
        this.images.length
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {},
  preventNav(event) {
    event.preventDefault();
    event.returnValue = "";
  },
  beforeUnmount() {
    const self = this;
    window.removeEventListener("beforeunload", self.preventNav);
  },
  beforeRouteLeave(to, from, next) {
    if (this.submitted) next();
    if (
      !this.submitted &&
      !window.confirm("You have unsaved changes. Do you want to leave?")
    ) {
      return;
    }
    next();
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const self = this;

      this.uploading = true;
      this.submitted = true;
      document.body.classList.add("uploading");
      const data = {
        name: this.name,
        category: this.category,
        brand: this.brand,
        price: this.price,
        description: this.description,
        images: this.images,
        available: this.available,
        watcher: this.uploadProgress,
      };
      this.$store
        .dispatch("products/" + types.ADD_PRODUCT, data)
        .then((response) => {
          setTimeout(() => {
            self.uploading = false;
            const id = response.id;
            console.log(id);
          }, 1000);
        });
    },
    uploadProgress(value) {
      this.progress = value;
    },
  },
};
</script>

<style scoped>
.add-cont {
  color: hsla(0, 0%, 100%, 0.8) !important;
}
input,
textarea {
  background: var(--bs-lighter) !important;
  border: none;
  border-radius: 1px;
  color: hsla(0, 0%, 100%, 0.6) !important;
  padding: 0.8rem 1rem;
}
span.required:before {
  content: "*";
  font-size: 1rem;
  position: absolute;
  color: var(--bs-info);
  margin: 0.1rem;
}
.form-group {
  margin-bottom: 0.5rem;
}

.uploading-cont .progress {
  background: transparent;
}
.uploading-cont {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000 !important;
  bottom: 0;
}
.uploading-cont .row {
  height: 100%;
  width: 100%;
}
.fullscreen button[type="submit"] {
  display: none;
}
</style>
<style>
.ck.ck-editor__main > .ck-editor__editable {
  background: var(--bs-lighter);
}
:root {
  --ck-color-toolbar-background: var(--bs-lighter);
}
.ck button {
  background: var(--bs-dark) !important;
  color: hsla(0, 0%, 100%, 0.8) !important;
}
.ck button:not(.ck-disabled) {
  cursor: pointer !important;
}
.ck.ck-toolbar {
  border: none;
}
.ck.ck-editor__editable_inline {
  background: rgba(255, 255, 255, 0.118) !important;
  border: none !important;
  min-height: 200px;
}
.ck button.ck-on {
  background: var(--bs-info) !important;
}
.ck br,
.ck p {
  margin-bottom: 0.2rem !important;
  margin-top: 0 !important;
}
.ck.ck-dropdown__panel {
  border-color: var(--bs-info);
}
.tooltip {
  z-index: 1000 !important;
  /* background: ; */
}
</style>