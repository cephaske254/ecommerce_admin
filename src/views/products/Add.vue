<template>
  <div v-show="!errored && !loading" class="container add-cont mt-3">
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
                class="form-control input"
                type="text"
                placeholder="Product Name"
              />
              <form-errors name="name" :errors="validate" :touched="touched" />
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <label for="categories">Categories</label>
                <span class="required"></span>
                <p class="smaller float-end mt-0 mb-0 text-end text-muted">
                  Categories that dont exist will be created automatically
                </p>

                <div
                  class="bg-dark d-flex flex-wrap borders border-lighter py-2 rounded"
                >
                  <div
                    v-for="(category, index) in product.categories"
                    :key="'axA-' + index"
                    class="badge bg-lighter d-flex align-items-center m-1"
                  >
                    <span>{{ category }}</span>
                    <i
                      @click="removeCategory(index)"
                      class="p-0 btn text-danger bi bi-dash bi-lg"
                    ></i>
                  </div>
                  <CommaSeparated :onChange="setCategories" />
                </div>

                <form-errors
                  name="categories"
                  :errors="validate"
                  :touched="touched"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="market_price">Market Price</label>
                <span class="required"></span>
                <input
                  @blur="blur"
                  @focus="focus"
                  @keyup="clean"
                  placeholder="Price in KES"
                  v-model="product.market_price"
                  id="market_price"
                  type="text"
                  class="form-control input"
                />
                <form-errors
                  name="market_price"
                  :errors="validate"
                  :touched="touched"
                />
              </div>
              <div v-if="!discount" class="col-md-6 d-flex">
                <button
                  type="button"
                  @click="
                    ($event) => {
                      focus({ target: { id: 'discount_price' } });
                    }
                  "
                  class="btn btn-sm text-info d-flex align-items-center p-0"
                >
                  <i class="bi bi-plus bi-lg"></i>
                  Add Discount
                </button>
              </div>
              <div v-else class="form-group col-md-6">
                <label for="discount_price">Discount Price</label>
                <span class="required"></span>
                <button
                  @click="
                    product.discount_price = null;
                    blur({ target: { id: 'discount_price' } });
                  "
                  class="btn btn-sm my-0 p-0 text-danger float-end"
                >
                  remove
                </button>
                <input
                  @blur="blur"
                  @focus="focus"
                  @keyup="clean"
                  placeholder="Price in KES"
                  v-model="product.discount_price"
                  id="discount_price"
                  type="text"
                  class="form-control input"
                />
                <form-errors
                  name="discount_price"
                  :errors="validate"
                  :touched="touched"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="brand">Brand</label>
              <p class="smaller float-end mt-0 mb-0 text-end text-muted">
                Brand that dont exist will be created automatically
              </p>
              <input
                @blur="blur"
                @focus="focus"
                placeholder="Product brand"
                v-model="product.brand"
                id="brand"
                type="text"
                class="form-control input"
              />
              <form-errors name="brand" :errors="validate" :touched="touched" />
            </div>
            <div class="form-group">
              <label for="description">Description</label>

              <span class="required"></span>
              <textarea
                @click="blur"
                ref="ckeditor"
                v-model="product.description"
                class="form-control input"
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
            :onRemoveImage="removeImage"
            :onCropImage="cropImage"
          />
          <form-errors name="images" :errors="validate" :touched="touched" />
        </div>
        <div class="col-12">
          <p class="text-muted small" hidden v-if="slug">
            CHANGES WILL BE COMMITED AFTER CLICKING SUBMIT
          </p>
          <div class="w-100 d-flex my-2 card-footer bg-dark">
            <div class="w-100 d-flex align-items-center">
              <label class="form-check-label" for="available"
                >Product availability</label
              >
              <div class="form-check form-switch mx-1 py-1">
                <input
                  @change="changeAvailability"
                  class="form-check-input"
                  type="checkbox"
                  id="available"
                  :checked="product && product.available === true"
                />
              </div>
            </div>
            <div class="fload-end d-flex">
              <router-link
                :to="{ name: 'Delete Product' }"
                class="btn btn-danger mx-1"
                v-if="slug"
                >DELETE</router-link
              >
              <button
                type="submit"
                v-html="slug ? 'UPDATE' : 'SUBMIT'"
                class="btn btn-primary mx-1"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <uploading :uploading="uploading" :progress="progress" :failed="false" />
    <router-view />
  </div>
  <error-abstract v-if="errored" :onRetry="getProduct" />
  <loadingsm :loading="loading" />
</template> 
<script>
import Croppie from "@/subcomponents/Croppie.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import validateFunc from "./validators";
import { cleanPrice, fields, buildImages } from "./helpers";
import * as types from "@/store/types";
import { commaValues } from "../../utils/functions";
import CommaSeparated from "./CommaSeparated.vue";
import Uploading from "../../subcomponents/Uploading.vue";
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";

export default {
  data() {
    return {
      product: {
        name: null,
        categories: [],
        brand: null,
        price: null,
        discount_price: null,
        description: "",
        available: true,
        images: [],
        removedImages: [],
        recroppedImages: [],
      },
      rawImages: [],
      submitted: false,
      progress: 0,
      uploading: false,
      loading: false,
      touched: [],
      focused: false,
      errors: {},
      errored: false,
    };
  },
  components: {
    Croppie,
    CommaSeparated,
    Uploading,
    ErrorAbstract,
  },
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
      if (this.$route.params.slug) return this.$route.params.slug;
      return null;
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
    changeAvailability(e) {
      this.product.available = e.target.checked;
    },
    buildEditor() {
      const self = this;
      const ckTarget = { target: { id: "description" } };
      self.editor
        .then((editor) => {
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
    submit(e) {
      e.preventDefault();
      this.touched = fields;
      if (this.validate.valid !== true) return;

      this.submitted = fields;
      this.uploading = true;
      this.errored = false;

      const self = this;
      function done(status, slug) {
        setTimeout(() => {
          self.progress = 100;
          self.uploading = false;
          if (status < 400) {
            self.navigate(slug);
          } else {
            self.errored = true;
          }
        }, 500);
      }

      const data = {
        ...this.product,
        price: cleanPrice(this.product.price),
        discount_price: cleanPrice(this.product.discount_price),
        watcher: this.progressWatcher,
      };
      if (this.slug) {
        this.$store
          .dispatch("products/" + types.UPDATE_PRODUCT, data, this.slug)
          .then((data) => {
            done(data.status, data.data.slug);
          });
      } else {
        this.$store
          .dispatch("products/" + types.ADD_PRODUCT, data)
          .then((data) => {
            done(data.status, data.data.slug);
          });
      }
    },
    progressWatcher(progress) {
      this.progress = progress;
    },
    getProduct() {
      const self = this;
      self.loading = true;

      this.$store
        .dispatch("products/" + types.GET_PRODUCT_DETAIL, this.slug)
        .then((data) => {
          self.errored = false;
          self.loading = false;

          self.product = {
            ...self.product,
            ...data.data,
            brand: data.data.brand ? data.data.brand.name : "",
            categories: data.data.categories,
            images: [],
          };

          buildImages(data.data.images, function (result) {
            const image = self.rawImages.find((i) => i.id === result.id);
            if (image && image.id === result.id) {
              image.original = result.original;
              return;
            } else {
              self.rawImages = [...self.rawImages, result];
            }
          });

          this.editor.then((editor) => {
            editor.setData(data.data.description || "");
          });
        })
        .catch(() => (this.errored = true));
    },
    removeCategory(index) {
      const categories = this.product.categories;
      const category = categories[index];
      this.product.categories = categories.filter((i) => i !== category);
    },
    removeImage(image) {
      if (image.remote !== true) return;
      const images = this.product.removedImages;
      this.product.removedImages = [...images, image.id];
    },
    cropImage(image) {
      const images = this.product.recropedImages || [];
      if (image.remote !== true && !images.find((img) => img.id === image.id))
        return;
      this.product.recroppedImages = [...images, image.id];
    },
    setCategories(values) {
      const categories = this.product.categories;
      const incoming = values.filter(
        (value) =>
          value !== undefined &&
          value.trim() != "" &&
          value != null &&
          !categories.includes(value.trim())
      );

      this.product.categories = [...this.product.categories, ...incoming];
    },
    navigate(slug) {
      this.$router.replace({
        name: "Product Detail",
        params: { slug: slug },
        query: { ref: this.$route.name },
      });
    },
  },
  mounted() {
    if (this.slug) {
      this.getProduct();
    } else {
      this.$options.currentPage("Add Product");
    }
    this.buildEditor();
  },
  // eslint-disable-next-line
  beforeRouteLeave(to, from, next) {
    // if (this.submitted) {
    //   next();
    //   return;
    // } else if (
    //   !this.submitted &&
    //   !window.confirm("You might have unsaved changes. Do you want to leave?")
    // ) {
    //   return;
    // } else {
      next();
    // }
  },
};
</script>

<style scoped>
.add-cont {
  color: hsla(0, 0%, 100%, 0.8) !important;
}

.form-group {
  margin-bottom: 0.5rem;
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
  min-height: 100px;
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
.smaller {
  font-size: 0.53rem;
}
</style>