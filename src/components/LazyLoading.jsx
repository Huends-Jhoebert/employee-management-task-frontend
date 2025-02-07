import Swal from "sweetalert2";

const LazyLoading = (title) => {
  Swal.fire({
    // title: "<strong>HTML <u>example</u></strong>",
    // icon: "info",
    title: `${title}`,
    html: `<div class="mt-3"><div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>`,

    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
  });
};

export default LazyLoading;
