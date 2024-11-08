document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registroForm");

    registroForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const alumno = ["nombre", "apellido", "email", "telefono", "matricula", "semestre"].reduce((data, field) => {
            data[field] = document.getElementById(field).value.trim();
            return data;
        }, {});

        if (Object.values(alumno).includes("")) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const alumnosHoy = JSON.parse(localStorage.getItem("alumnosHoy")) || [];
        if (alumnosHoy.includes(alumno.matricula)) {
            alert("La matrícula ya ha sido registrada hoy.");
            return;
        }

        const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        alumnos.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        alumnosHoy.push(alumno.matricula);
        localStorage.setItem("alumnosHoy", JSON.stringify(alumnosHoy));

        registroForm.reset();
        alert("Formulario enviado con éxito!");
    });

    document.getElementById("backButton").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
