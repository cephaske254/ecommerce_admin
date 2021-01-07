
export default {
    data: function() {
      return {
        submitted: false,
  
        progress: 0,
        uploading: false,
  
        touched: [],
        errors: {},
  
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
      };
    },
    computed: {
      productSlug() {
        const route = this.$route;
  
        return route.name === "Edit Product" ? route.params.slug : null;
      },
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
  
    mounted() {
      const self = this;
      const ckTarget = { target: { id: "description" } };
      ClassicEditor.create(this.$refs.ckeditor)
        .then((editor) => {
          editor.setData(this.product.description);
          return editor;
        })
        .then((editor) => {
          editor.model.document.on("change:data", function() {
            self.product.description = editor.getData();
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
      if (this.productSlug) this.getProduct();
    },
  
    beforeUnmount() {
      const self = this;
      window.removeEventListener("beforeunload", self.preventNav);
    },
    methods: {
      submit(e) {
        e.preventDefault();
        const self = this;
        this.touched = [
          "name",
          "category",
          "brand",
          "price",
          "discount_price",
          "description",
          "images",
        ];
  
        const validate = self.validate();
        if (validate.valid !== true) return;
  
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
        this.handleSubmit(data);
      },
      handleSubmit(data) {
        const self = this;
  
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
  
      getProduct() {
        // const self = this;
        this.$store
          .dispatch("products/" + types.GET_PRODUCT_DETAIL, this.productSlug)
          .then((data) => console.log(data));
        // .finally(function () {});
      },
    },
    watch: {
      images() {
        this.blur({ target: { id: "images" } });
      },
    },
  };
