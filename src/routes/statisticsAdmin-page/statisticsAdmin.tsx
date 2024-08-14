import React, { useState } from "react";
import "./statisticsAdmin.css";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Chart } from "react-google-charts";

export default function StatisticsAdmin() {
    const { t } = useTranslation();


    class House {
        id: number;
        name: string;
        location: string;
        pic: any;
        date: any;
        numberLodgers: any;
        host: any;
        rating: any;
    
        constructor(
          id: number,
          name: string,
          location: string,
          pic: string,
          date: string,
          numberLodgers: string,
          host: string,
          rating: string,
        ) {
          this.id = id;
          this.name = name;
          this.location = location;
          this.pic = pic;
          this.date = date;
          this.numberLodgers = numberLodgers;
          this.host = host;
          this.rating = rating;
        }
    }
    var myDate = new Date();
    var myDateString: string;

    myDate.setDate(myDate.getDate());

    myDateString =
    ("0" + myDate.getDate()).slice(-2) +
    "/" +
    ("0" + (myDate.getMonth() + 1)).slice(-2) +
    "/" +
    myDate.getFullYear();

    var myDate1 = new Date (2021,1,10);
    var myDate1S:string;
    myDate1S = 
    ("0" + myDate1.getDate()).slice(-2) +
    "/" +
    ("0" + (myDate1.getMonth() + 1)).slice(-2) +
    "/" +
    myDate1.getFullYear();

    var myDate2 = new Date (2021,2,11);
    var myDate2S:string;
    myDate2S = 
    ("0" + myDate2.getDate()).slice(-2) +
    "/" +
    ("0" + (myDate2.getMonth() + 1)).slice(-2) +
    "/" +
    myDate2.getFullYear();

    var imagem = "https://picsum.photos/600/400/?random";
    var house1 = new House(1,"Casa mais linda","Benfica", imagem,myDateString, "3", "Maria Mendonça", "4.45");
    var house2 = new House(2,"Casa com boa vista","Lisboa Centro", imagem,myDateString, "4", "Marta Viegas", "4.45");
    var house3 = new House(3, "Vivenda PGP", "Ajuda", imagem, myDate1S, "5", "Maria Mendonça", "4.5");
    var house4 = new House(4,"T1 Varanda grande","Campo Grande", imagem,myDate2S, "2", "Marta Viegas", "4.15");
    var house5 = new House(5,"Home Sweet Home","Alvalade", imagem,myDate2S, "3","Maria Mendonça", "4.25");
    var house6 = new House(6,"casa6","rua das pessoas", imagem,myDateString, "4", "Marta Viegas", "4.95");
    
    var listOfHouses: Array<House>;
    listOfHouses = [house1, house2, house3, house4, house5, house6];

    class Service {
        id: number;
        nameProvider: string;
        location: string;
        priceHour: number;
        typeService: any;
        date: any;
    
        constructor(
          id: number,
          nameProvider: string,
          location: string,
          priceHour: number,
          typeService: string,
          date: string
        ) {
          this.id = id;
          this.nameProvider = nameProvider;
          this.location = location;
          this.priceHour = priceHour;
          this.typeService = typeService;
          this.date = date; // date that the service was executed
        }
    }
    
    var service1 = new Service(1,"Maria Mendonça", "Benfica", 20, "engomar", myDateString);
    var service2 = new Service(2,"Marta Viegas", "Lisboa Centro", 15, "limpar o pó", myDateString);
    var service3 = new Service(3,"Maria Mendonça", "Benfica", 20, "engomar", myDate1S);
    var service4 = new Service(4,"Marta Viegas", "Lisboa Centro", 15, "limpar o pó", myDate2S);
    var service5 = new Service(5,"Maria Mendonça", "Benfica", 20, "engomar", myDate2S);
    var service6 = new Service(6,"Marta Viegas", "Lisboa Centro", 15, "limpar o pó", myDateString);
    
    var listOfServices: Array<Service>;
    listOfServices = [service1, service2, service3, service4, service5, service6];
    
    

    function monthRent(month:string) {
        const monthOfRent1 = []
        const monthOfRent2 = []
        const monthOfRent3 = []
        const monthOfRent4 = []
        const monthOfRent5 = []
        const monthOfRent6 = []
        const monthOfRent7 = []
        const monthOfRent8 = []
        const monthOfRent9 = []
        const monthOfRent10 = []
        const monthOfRent11 = []
        const monthOfRent12 = []
        let month1 = 0;
        let month2 = 0;
        let month3 = 0;
        let month4 = 0;
        let month5 = 0;
        let month6 = 0;
        let month7 = 0;
        let month8 = 0;
        let month9 = 0;
        let month10 = 0;
        let month11 = 0;
        let month12 = 0;
        for (const monthHouses of listOfHouses) {
            console.log("day: " + monthHouses.date);
            console.log("day substring: " + monthHouses.date.substring(3,5));
            if (monthHouses.date.substring(3,5) === "01") {
                month1 = month1 + 1;
            }if (monthHouses.date.substring(3,5) === "02") {
                month2 = month2 + 1;
            }if (monthHouses.date.substring(3,5) === "03") {
                month3 = month3 + 1;
            }if (monthHouses.date.substring(3,5) === "04") {
                month4 = month4 + 1;
            }if (monthHouses.date.substring(3,5) === "05") {
                month5 = month5 + 1;
            }if (monthHouses.date.substring(3,5) === "06") {
                month6 = month6 + 1;
            }if (monthHouses.date.substring(3,5) === "07") {
                month7 = month7 + 1;
            }if (monthHouses.date.substring(3,5) === "08") {
                month8 = month8 + 1;
            }if (monthHouses.date.substring(3,5) === "09") {
                month9 = month9 + 1;
            }if (monthHouses.date.substring(3,5) === "10") {
                month10 = month10 + 1;
            }if (monthHouses.date.substring(3,5) === "11") {
                month11 = month11 + 1;
            }if (monthHouses.date.substring(3,5) === "12") {
                month12 = month12 + 1;
            }  
        }

        if (month === "01") {
            monthOfRent1.push("January", month1);
            return monthOfRent1;
        }else if (month === "02") {
            monthOfRent2.push("February", month2);
            return monthOfRent2;
        }else if (month === "03") {
            monthOfRent3.push("March", month3);
            return monthOfRent3;
        }else if (month === "04") {
            monthOfRent4.push("April", month4);
            return monthOfRent4;
        }else if (month === "05") {
            monthOfRent5.push("May", month5);
            return monthOfRent5;
        } else if (month === "06") {
            monthOfRent6.push("June", month6);
            return monthOfRent6;
        } else if (month === "07") {
            monthOfRent7.push("July", month7);
            return monthOfRent7;
        } else if (month === "08") {
            monthOfRent8.push("August", month8);
            return monthOfRent8;
        } else if (month === "09") {
            monthOfRent9.push("Semptember", month9);
            return monthOfRent9;
        } else if (month === "10") {
            monthOfRent10.push("October", month10);
            return monthOfRent10;
        } else if (month === "11") {
            monthOfRent11.push("November", month11);
            return monthOfRent11;
        } else if (month === "12") {
            monthOfRent12.push("December", month12);
            return monthOfRent12;
        }
    }


    function monthService(month:string) {
        const monthOfService1 = []
        const monthOfService2 = []
        const monthOfService3 = []
        const monthOfService4 = []
        const monthOfService5 = []
        const monthOfService6 = []
        const monthOfService7 = []
        const monthOfService8 = []
        const monthOfService9 = []
        const monthOfService10 = []
        const monthOfService11 = []
        const monthOfService12 = []
        let month1:number = 0;
        let month2:number = 0;
        let month3:number = 0;
        let month4:number = 0;
        let month5:number = 0;
        let month6:number = 0;
        let month7:number = 0;
        let month8:number = 0;
        let month9:number = 0;
        let month10:number = 0;
        let month11:number = 0;
        let month12:number = 0;
        for (const monthServices of listOfServices) {
            if (monthServices.date.substring(3,5) === "01") {
                month1 = month1 + 1;
            }if (monthServices.date.substring(3,5) === "02") {
                month2 = month2 + 1;
            }if (monthServices.date.substring(3,5) === "03") {
                month3 = month3 + 1;
            }if (monthServices.date.substring(3,5) === "04") {
                month4 = month4 + 1;
            }if (monthServices.date.substring(3,5) === "05") {
                month5 = month5 + 1;
            }if (monthServices.date.substring(3,5) === "06") {
                month6 = month6 + 1;
            }if (monthServices.date.substring(3,5) === "07") {
                month7 = month7 + 1;
            }if (monthServices.date.substring(3,5) === "08") {
                month8 = month8 + 1;
            }if (monthServices.date.substring(3,5) === "09") {
                month9 = month9 + 1;
            }if (monthServices.date.substring(3,5) === "10") {
                month10 = month10 + 1;
            }if (monthServices.date.substring(3,5) === "11") {
                month11 = month11 + 1;
            }if (monthServices.date.substring(3,5) === "12") {
                month12 = month12 + 1;
            }  
        }
        if (month === "01") {
            monthOfService1.push("January", month1);
            return monthOfService1;
        }else if (month === "02") {
            monthOfService2.push("February", month2);
            return monthOfService2;
        }else if (month === "03") {
            monthOfService3.push("March", month3);
            return monthOfService3;
        }else if (month === "04") {
            monthOfService4.push("April", month4);
            return monthOfService4;
        }else if (month === "05") {
            monthOfService5.push("May", month5);
            return monthOfService5;
        } else if (month === "06") {
            monthOfService6.push("June", month6);
            return monthOfService6;
        } else if (month === "07") {
            monthOfService7.push("July", month7);
            return monthOfService7;
        } else if (month === "08") {
            monthOfService8.push("August", month8);
            return monthOfService8;
        } else if (month === "09") {
            monthOfService9.push("Semptember", month9);
            return monthOfService9;
        } else if (month === "10") {
            monthOfService10.push("October", month10);
            return monthOfService10;
        } else if (month === "11") {
            monthOfService11.push("November", month11);
            return monthOfService11;
        } else if (month === "12") {
            monthOfService12.push("December", month12);
            return monthOfService12;
        }
    }

    //sales related to how many rents/sells made by year
    //expanses related to how many services made by year
    function yearPerformance(year:string) {
        const yearPerformance1 = [];
        const yearPerformance2 = [];
        const yearPerformance3 = [];
        const yearPerformance4 = [];
        if (year === "2018") {
            yearPerformance1.push(year, 1000, 400);
            return yearPerformance1;
        } else if (year === "2019") {
            yearPerformance2.push(year, 1170, 460);
            return yearPerformance2;
        } else if (year === "2020") {
            yearPerformance3.push(year, 660, 1120);
            return yearPerformance3;
        } else if (year === "2021") {
            yearPerformance4.push(year, 1030, 540);
            return yearPerformance4;
        }
    }

    //sales related to how many rents/sells made by year
    //expanses related to how many services made by year
    function monthRevenueHouses(month:string) {
        const monthOfService1 = []
        const monthOfService2 = []
        const monthOfService3 = []
        const monthOfService4 = []
        const monthOfService5 = []
        const monthOfService6 = []
        const monthOfService7 = []
        const monthOfService8 = []
        const monthOfService9 = []
        const monthOfService10 = []
        const monthOfService11 = []
        const monthOfService12 = []
        
        if (month === "01") {
            monthOfService1.push("leases Of houses", 11);
            return monthOfService1;
        }else if (month === "02") {
            monthOfService2.push("leases Of houses", 10);
            return monthOfService2;
        }else if (month === "03") {
            monthOfService3.push("leases Of houses", 10);
            return monthOfService3;
        }else if (month === "04") {
            monthOfService4.push("leases Of houses", 11);
            return monthOfService4;
        }else if (month === "05") {
            monthOfService5.push("leases Of houses", 10);
            return monthOfService5;
        } else if (month === "06") {
            monthOfService6.push("leases Of houses", 11);
            return monthOfService6;
        } else if (month === "07") {
            monthOfService7.push("leases Of houses", 10);
            return monthOfService7;
        } else if (month === "08") {
            monthOfService8.push("leases Of houses", 11);
            return monthOfService8;
        } else if (month === "09") {
            monthOfService9.push("leases Of houses", 10);
            return monthOfService9;
        } else if (month === "10") {
            monthOfService10.push("leases Of houses", 11);
            return monthOfService10;
        } else if (month === "11") {
            monthOfService11.push("leases Of houses", 10);
            return monthOfService11;
        } else if (month === "12") {
            monthOfService12.push("leases Of houses", 11);
            return monthOfService12;
        }
    }


    function monthServicesProvision(month:string) {
        const monthOfRent1 = []
        const monthOfRent2 = []
        const monthOfRent3 = []
        const monthOfRent4 = []
        const monthOfRent5 = []
        const monthOfRent6 = []
        const monthOfRent7 = []
        const monthOfRent8 = []
        const monthOfRent9 = []
        const monthOfRent10 = []
        const monthOfRent11 = []
        const monthOfRent12 = []
        
        if (month === "01") {
            monthOfRent1.push("Services Provision", 2);
            return monthOfRent1;
        }else if (month === "02") {
            monthOfRent2.push("Services Provision", 3);
            return monthOfRent2;
        }else if (month === "03") {
            monthOfRent3.push("Services Provision", 2);
            return monthOfRent3;
        }else if (month === "04") {
            monthOfRent4.push("Services Provision", 3);
            return monthOfRent4;
        }else if (month === "05") {
            monthOfRent5.push("Services Provision", 2);
            return monthOfRent5;
        } else if (month === "06") {
            monthOfRent6.push("Services Provision", 3);
            return monthOfRent6;
        } else if (month === "07") {
            monthOfRent7.push("Services Provision", 2);
            return monthOfRent7;
        } else if (month === "08") {
            monthOfRent8.push("Services Provision", 3);
            return monthOfRent8;
        } else if (month === "09") {
            monthOfRent9.push("Services Provision", 2);
            return monthOfRent9;
        } else if (month === "10") {
            monthOfRent10.push("Services Provision", 3);
            return monthOfRent10;
        } else if (month === "11") {
            monthOfRent11.push("Services Provision", 2);
            return monthOfRent11;
        } else if (month === "12") {
            monthOfRent12.push("Services Provision", 3);
            return monthOfRent12;
        }
    }

    return (
        <div className="bg-main">
            <Navbar />
            <div className="grid grid-cols-2 gap-4 mt-10">
                {/* Arrendamentos por mês */}
                
                <div className="chart">
                    <Chart
                        width={'600px'}
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Month", "Number of rents"],
                            monthRent("01"),
                            monthRent("02"),
                            monthRent("03"),
                            monthRent("04"),
                            monthRent("05"),
                            monthRent("06"),
                            monthRent("07"),
                            monthRent("08"),
                            monthRent("09"),
                            monthRent("10"),
                            monthRent("11"),
                            monthRent("12"),
                        ]}
                        options={{
                        series: [
                            {color: '#2D4059'},
                        ],
                        backgroundColor: 'none',
                        title: "Rents per month",
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: "Month",
                            minValue: 0,
                        },
                        vAxis: {
                            title: "Rents in UHome",
                        },
                        }}
                        legendToggle
                    />
                </div>  
                {/* Prestação de serviços por mês */}
                <div className="chart">
                    <Chart
                        width={'600px'}
                        height={'300px'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Mês" , "Number of services"],
                            monthService("01"),
                            monthService("02"),
                            monthService("03"),
                            monthService("04"),
                            monthService("05"),
                            monthService("06"),
                            monthService("07"),
                            monthService("08"),
                            monthService("09"),
                            monthService("10"),
                            monthService("11"),
                            monthService("12"),
                        ]}
                        options={{
                        series: [
                            {color: '#2D4059'},
                        ],
                        backgroundColor: 'none',
                        title: "Services per month",
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: "Month",
                            minValue: 0,
                        },
                        vAxis: {
                            title: "Services in UHome",
                        },
                        }}
                        legendToggle
                    />
                </div> 

                {/* Arrendamento de casas e prestação de serviços comparação */}
                <div className="chart">       
                    <Chart
                        width={'600px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ["Houses / Services", "Revenue"],
                            monthRevenueHouses("01"),
                            monthServicesProvision("01"),
                        ]}
                        options={{
                            slices: {
                                0: {color: '#2D4059'},
                                1: {color: '#EA5455'},
                            },
                            backgroundColor: 'none',
                            title: "The Month",
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>

                {/* Perfomance UHome */}
                <div className="chart"> 

                    <Chart
                        width={'600px'}
                        height={'300px'}
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                        ["year", "Sales/rents", "expenses"],
                        yearPerformance("2018"),
                        yearPerformance("2019"),
                        yearPerformance("2020"),
                        yearPerformance("2021"),
                        ]}
                        options={{
                        series: {
                            1: {color:'#2D4059'},
                            2: {color: '#EA5455'},
                        },
                        backgroundColor: 'none',
                        title: "UHome Performance",
                        hAxis: { title: "Year", titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        // For the legend to fit, we make the chart area smaller
                        chartArea: { width: '50%', height: '50%' },
                        // lineWidth: 25
                        }}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )

}





