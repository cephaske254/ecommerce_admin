import Chart from "chart.js";
export const chartNames = {
  general: "All Customers",
  returning: "Returning Customers",
  new: "New Customers",
};

function buildBg(ctx) {
  let grd = ctx.createLinearGradient(70, 360, 70, 0);
  grd.addColorStop(0, "transparent");
  grd.addColorStop(1, "rgba(228, 81, 195, .3)");
  return grd;
}
function buildDataSet(context, data, label) {
  return {
    backgroundColor: buildBg(context),
    label,
    borderWidth: 2,
    borderColor: "#e451ce",
    data,
  };
}
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const options = {
  responsiveAnimationDuration: 0,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    mode: "nearest",
  },

};

export function buildGeneral(
  context,
  data = [0, 10, 5, 2, 20, 30, 25, 60, 21, 43, 33, 9]
) {
  destroyChart();
  return (type = "line") => {
    window.performanceChart = new Chart(context, {
      type,
      data: {
        labels,
        datasets: [new buildDataSet(context, data, "General Customers")],
      },
      options,
    });
  };
}

export function buildReturning(
  context,
  data = [0, 2, 4, 5, 7, 13, 6, 2, 5, 10, 4, 1]
) {
  destroyChart();
  return (type = "line") => {
    window.performanceChart = new Chart(context, {
      type,
      data: {
        labels,
        datasets: [new buildDataSet(context, data, "Returning Customers")],
      },
      options,
    });
  };
}

function destroyChart() {
  if (window.performanceChart) {
    window.performanceChart.destroy();
  }
}