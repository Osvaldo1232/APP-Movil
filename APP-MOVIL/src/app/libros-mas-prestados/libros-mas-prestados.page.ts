import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TopLibros } from '../modelos/LoginResponse';
import { ServiciosApi } from '../Servicios/servicios-api';
import { LoadingService } from '../shared/loading-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { Chart } from 'chart.js';
@Component({
  selector: 'app-libros-mas-prestados',
  templateUrl: './libros-mas-prestados.page.html',
  styleUrls: ['./libros-mas-prestados.page.scss'],
  standalone:false

})
export class LibrosMasPrestadosPage implements OnInit {

 @ViewChild('graficaContainer', { static: false }) graficaContainer!: ElementRef;

  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef;
  barChart: any;
leyenda: any[] = [];
  constructor(private service: ServiciosApi,     private loadingService: LoadingService) {}

  ngOnInit() {
    this.cargarDatos();
  }

 mostrarValoresPlugin = {
  id: 'mostrarValores',
  afterDatasetsDraw(chart: any) {
    const ctx = chart.ctx;

    chart.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((bar: any, index: number) => {
        const valor = dataset.data[index];

        ctx.fillStyle = "#000"; 
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        const x = bar.x;
        const y = bar.y - 5; 

        ctx.fillText(valor, x, y);
      });
    });
  }
};


  cargarDatos() {
    this.loadingService.show();

    this.service.obtenerTop10Libros().subscribe({
      next: (data: TopLibros[]) => {
this.loadingService.hide();
        const labels = data.map(x => x.nombreLibro);
        const totales = data.map(x => x.totalPrestamos);

        const colores = totales.map(() =>
          `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`
        );

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Total de préstamos',
              data: totales,
              backgroundColor: colores
            }]
          },

          options: {
            responsive: true,
            maintainAspectRatio: false,

             layout: {
      padding: {
        top: 70 
      }
    },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              },
              x: {
                ticks: {
                  maxRotation: 65,
                  minRotation: 45
                }
              }
            }
          },

           plugins: [this.mostrarValoresPlugin]
        });

      }
    });
  }


  async exportarPDF() {
  const element = this.graficaContainer.nativeElement;

  const canvas = await html2canvas(element, {
    scale: 3, 
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

  pdf.save('grafica-prestamos.pdf');
}


}
