dscc.subscribeToData(draw, { transform: dscc.objectTransform });

function draw(data) {
  const rows = data.tables.DEFAULT || [];

  const container = document.getElementById("table-container");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Persona</th>
        <th>Vacaciones</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  rows.forEach((row) => {
    // ⚠️ Estos nombres los ajustaremos al paso siguiente
    const persona = row.persona?.value ?? "";
    const dias = row.vacaciones?.value ?? "";
    const inici = row.data_inici?.value ?? "";
    const tornada = row.data_tornada?.value ?? "";

    const tr = document.createElement("tr");

    const tdPersona = document.createElement("td");
    tdPersona.textContent = persona;

    const tdVacaciones = document.createElement("td");
    tdVacaciones.textContent = dias;

    tdVacaciones.addEventListener("mouseenter", (e) => {
      const tooltip = document.getElementById("tooltip");
      tooltip.innerText =
        `📅 Inicio: ${inici}\n` +
        `📅 Fin: ${tornada}\n` +
        `📆 Días: ${dias}`;
      tooltip.style.display = "block";
      tooltip.style.left = (e.pageX + 10) + "px";
      tooltip.style.top = (e.pageY + 10) + "px";
    });

    tdVacaciones.addEventListener("mouseleave", () => {
      document.getElementById("tooltip").style.display = "none";
    });

    tr.appendChild(tdPersona);
    tr.appendChild(tdVacaciones);
    tbody.appendChild(tr);
  });

  container.appendChild(table);
}
