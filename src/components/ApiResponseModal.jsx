import Swal from "sweetalert2";

const ApiResponseModal = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};

export default ApiResponseModal;
