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
                @blur="blur"
                @focus="focus"
                id="name"
                v-model="product.name"
                class="form-control"
                type="text"
                placeholder="Product Name"
              />
              <form-errors name="name" :errors="validate" :touched="touched" />
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <label for="categories">Categories</label>
                <span class="required"></span>

                <div class="bg-dark d-flex flex-wrap">
                  <div
                    v-for="(category, index) in product.categories"
                    :key="'axA-' + index"
                    class="badge bg-lighter d-flex align-items-center mx-1"
                  >
                    <span v-if="typeof category === 'object'">{{
                      category.name
                    }}</span>
                    <span v-else>{{ category }}</span>
                    <i
                      @click="removeCategory(index)"
                      class="btn p-0 text-danger bi bi-dash bi-lg"
                    ></i>
                  </div>
                </div>
                <button
                  @click="focused = true"
                  type="button"
                  class="btn btn-sm btn-light m-2 rounded-md py-0 shadow"
                >
                  ADD
                </button>

                <form-errors
                  name="categories"
                  :errors="validate"
                  :touched="touched"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="brand">Brand</label>
                <input
                  @blur="blur"
                  @focus="focus"
                  placeholder="Product brand"
                  v-model="product.brand"
                  id="brand"
                  type="text"
                  class="form-control"
                />
                <form-errors
                  name="brand"
                  :errors="validate"
                  :touched="touched"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="price">Price</label>
                <span class="required"></span>
                <input
                  @blur="blur"
                  @focus="focus"
                  @keyup="clean"
                  placeholder="Price in KES"
                  v-model="product.price"
                  id="price"
                  type="text"
                  class="form-control"
                />
                <form-errors
                  name="price"
                  :errors="validate"
                  :touched="touched"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>

              <span class="required"></span>
              <textarea
                @click="blur"
                ref="ckeditor"
                v-model="product.description"
                class="form-control"
                id="ckeditor"
              ></textarea>
              <form-errors
                name="description"
                :errors="validate"
                :touched="touched"
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="images">Product Images</label>
            <span class="required"></span>
          </div>
          <croppie
            :rawImages="rawImages"
            :edit="slug ? true : false"
            :onChange="(data) => (product.images = data)"
          />
          <form-errors name="images" :errors="validate" :touched="touched" />
        </div>
        <div class="col-12">
          <p class="text-muted float-start small" v-if="slug">
            CHANGES WILL BE COMMITED AFTER CLICKING SUBMIT
          </p>
          <button type="submit" class="btn btn-primary mb-2 float-end">
            SUBMIT
          </button>
        </div>
      </div>
    </form>
    <div class="container-fluid uploading-cont bg-dark" v-if="uploading">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-6 col-lg-4 col-sm-10 d-block">
          <div class="progress border border-primary">
            <div
              class="progress-bar progress-bar-stripped bg-primary"
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
import Croppie from "@/subcomponents/Croppie.vue";
import FormErrors from "./formErrors";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import validateFunc from "./validators";
import { cleanPrice, fields, buildImages } from "./helpers";
import * as types from "@/store/types";
import { commaValues } from "../../utils/functions";

export default {
  data() {
    return {
      product: {
        name: null,
        categories: ["name", "second", "again"],
        brand: null,
        price: null,
        discount_price: null,
        description: "",
        available: "",
        images: [],
      },
      rawImages: [],
      submitted: false,
      progress: 0,
      uploading: false,
      touched: [],
      errors: {},
      focused: false,
    };
  },
  components: { FormErrors, Croppie },
  computed: {
    editor() {
      return ClassicEditor.create(this.$refs.ckeditor);
    },
    discount() {
      if (
        (this.product &&
          this.product.discount_price !== null &&
          this.product.discount_price !== undefined &&
          this.product.discount_price !== "") ||
        this.focused
      )
        return true;
      return false;
    },
    validate: function () {
      return validateFunc(this.product, { discount: this.discount });
    },
    slug() {
      if (this.$route.name === "Edit Product") return this.$route.params.slug;
      return null;
    },
    getImages() {
      if (this.product.images && !this.product.images.length > 0) return [];
      return this.product.images;
    },
  },
  methods: {
    commaValues,
    blur(e) {
      if (!this.touched.includes(e.target.id)) {
        this.touched = [...this.touched, e.target.id];
      }
      if (e.target.id === "discount_price") this.focused = false;
    },
    focus(e) {
      const id = e.target.id;
      if (!this.touched.includes(id && this.errors[id])) {
        this.touched = this.touched.filter((t) => t !== id);
      }
      if (e.target.id === "discount_price") this.focused = true;
    },
    clean(e) {
      this.product[e.target.id] = cleanPrice(e.target.value);
    },
    submit(e) {
      e.preventDefault();
      this.touched = fields;
      if (this.validate.valid !== true) return;

      this.uploading = true;

      const self = this;
      function done() {
        setTimeout(() => {
          self.progress = 100;
          self.uploading = false;
        }, 500);
      }

      const data = {
        ...this.product,
        price: cleanPrice(this.product.price),
        discount_price: cleanPrice(this.product.discount_price),
      };
      if (this.slug) {
        this.$store
          .dispatch("products/" + types.UPDATE_PRODUCT, data, this.slug)
          .then(done());
      } else {
        this.$store.dispatch("products/" + types.ADD_PRODUCT, data);
      }
    },
    getProduct() {
      this.$store
        .dispatch("products/" + types.GET_PRODUCT_DETAIL, this.slug)
        .then((data) => {
          this.product = {
            ...data.data,
            brand: data.data.brand ? data.data.brand.name : "",
            categories: data.data.categories ? data.data.categories.name : "",
            images: [],
          };
          const self = this;

          buildImages(data.data.images, function (result) {
            const image = self.rawImages.find((i) => i.id === result.id);
            if (image) {
              image.original = result.original;
              return;
            }
            self.rawImages = [...self.rawImages, result];
          });

          this.editor.then((editor) =>
            editor.setData(data.data["description"])
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeCategory(index) {
      const categories = this.product.categories;
      const category = categories[index];
      this.product.categories = categories.filter((i) => i !== category);
    },
  },
  mounted() {
    const self = this;
    if (self.slug) self.getProduct();

    const ckTarget = { target: { id: "description" } };
    self.editor
      .then((editor) => {
        editor.setData(self.product.description);
        return editor;
      })
      .then((editor) => {
        editor.model.document.on("change:data", function () {
          self.product.description = editor.getData();
          return editor;
        });

        editor.ui.focusTracker.on(
          "change:isFocused",
          (evt, name, isFocused) => {
            if (isFocused === true) {
              self.focus(ckTarget);
              return;
            }
            self.blur(ckTarget);
          }
        );
      });
  },
  // eslint-disable-next-line
  beforeRouteLeave(to, from, next) {
    if (this.submitted) next();
    if (
      !this.submitted &&
      !window.confirm("You might have unsaved changes. Do you want to leave?")
    ) {
      return;
    }
    next();
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
  color: var(--bs-primary);
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
  --ck-color-toolbar-background: var(--bs-lighter) !important;
  --ck-color-toolbar-border: var(--bs-lighter) !important;
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
  background: var(--bs-primary) !important;
}
.ck br,
.ck p {
  margin-bottom: 0.2rem !important;
  margin-top: 0 !important;
}
.ck.ck-dropdown__panel {
  border-color: var(--bs-primary);
}
.tooltip {
  z-index: 1000 !important;
  /* background: ; */
}
</style>