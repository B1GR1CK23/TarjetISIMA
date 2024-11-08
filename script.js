document.addEventListener("DOMContentLoaded", () => {
    console.log("¡JavaScript cargado y listo!");

    const registroButton = document.getElementById("registroButton");
    registroButton.addEventListener("click", () => {
        window.location.href = "registro.html";
    });

    const mostrarClaveButton = document.getElementById("mostrarClaveButton");
    const claveContainer = document.getElementById("claveContainer");
    const listaContainer = document.getElementById("listaContainer");
    const claveButton = document.getElementById("claveButton");
    const listaAlumnos = document.getElementById("listaAlumnos");
    const alumnosTable = document.getElementById("alumnosTable");

    mostrarClaveButton.addEventListener("click", () => {
        claveContainer.classList.toggle("hidden");
    });

    claveButton.addEventListener("click", () => {
        if (document.getElementById("claveInput").value === "3458") {
            listaContainer.classList.remove("hidden");
            claveContainer.classList.add("hidden");
            alumnosTable.classList.add("hidden"); // Oculta la tabla inicialmente
        } else {
            alert("Clave incorrecta");
        }
    });

    const cargarAlumnos = (semestre) => {
        const storedAlumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        listaAlumnos.innerHTML = "";
        storedAlumnos.sort((a, b) => a.apellido.localeCompare(b.apellido)).forEach(alumno => {
            if (alumno.semestre == semestre) {
                listaAlumnos.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.apellido}</td>
                        <td>${alumno.email}</td>
                        <td>${alumno.telefono}</td>
                        <td>${alumno.matricula}</td>
                        <td>${alumno.semestre}</td>
                    </tr>
                `);
            }
        });
        alumnosTable.classList.toggle("hidden", listaAlumnos.childElementCount === 0);
    };

    document.querySelectorAll(".semestreButton").forEach(button => {
        button.addEventListener("click", () => {
            const semestre = button.dataset.semestre;
            cargarAlumnos(semestre);
        });
    });
});
