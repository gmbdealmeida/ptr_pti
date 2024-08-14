import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="footer bg-gray-800 relative pt-1">
        <div className="container mx-auto px-6">
          <div className="sm:flex sm:mt-8">
            <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-around">
              <div className="flex flex-col">
                <span className="font-bold text-gray-200 uppercase mb-2">
                  {t("faculty")}
                </span>
                <div id="listaProfsUCs">
                  <div className="inline-block mr-8">
                    <ul>
                      <li>
                        <span className="my-2">
                          <a
                            href="https://fenix.ciencias.ulisboa.pt/degrees/tecnologias-de-informacao-564500436615450/disciplina-curricular/2253530685505944"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            PTI
                          </a>
                        </span>
                      </li>
                      <li>
                        <span className="my-2">
                          <a
                            href="https://fenix.ciencias.ulisboa.pt/degrees/tecnologias-de-informacao-564500436615450/disciplina-curricular/2253530685505943"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            PTR
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="inline-block mr-8">
                    <ul>
                      <li>
                        <span className="my-2">
                          <a
                            href="https://ciencias.ulisboa.pt/pt/perfil/amferreira"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            António Ferreira
                          </a>
                        </span>
                      </li>
                      <li>
                        <span className="my-2">
                          <a
                            href="https://ciencias.ulisboa.pt/pt/perfil/mcalha"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Mário Calha
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                </div>
                </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-200 uppercase mt-4 md:mt-0 mb-2">
                  {t("group-members")}
                </span>
                <div id="listaAlunos">
                  <div className="inline-block mr-8">
                    <ul>

                      <li>
                        <span className="my-2">
                          <a
                            href="https://www.linkedin.com/in/artur-cancela-11b8181bb/"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Artur Cancela
                          </a>
                        </span>
                      </li>

                      <li>
                        <span className="my-2">
                          <a
                            href="https://www.linkedin.com/in/andrei-tataru-b473a01aa/"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Andrei Tataru
                          </a>
                        </span>
                      </li>

                      <li>
                        <span className="my-2">
                          <a
                            href="https://github.com/DiogoRamos22"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Diogo Ramos
                          </a>
                        </span>
                      </li>

                    </ul>
                  </div>
                  <div className="inline-block">
                    <ul>

                      <li>
                        <span className="my-2">
                          <a
                            href="https://github.com/gmbdealmeida"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Guilherme Almeida
                          </a>
                        </span>
                      </li>

                      <li>
                        <span className="my-2">
                          <a
                            href="https://github.com/mariaMendonca1"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Maria Mendonça
                          </a>
                        </span>
                      </li>

                      <li>
                        <span className="my-2">
                          <a
                            href="https://github.com/martaViegass"
                            className="  inline-block text-blue-500  text-md hover:text-salmon"
                          >
                            Marta Viegas
                          </a>
                        </span>
                      </li>
                                       
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
              <span className="font-bold text-gray-200 uppercase mb-2">
              {t("information")}
                </span>
                <span className="text-blue-500  text-md hover:text-salmon">
                <a href="">FAQs</a>
                </span>
                <span className="text-blue-500  text-md hover:text-salmon">
                <a href="">{t("contacts")}</a>
                </span>
                <span className="text-blue-500  text-md hover:text-salmon">
                    <a href="">{t("about-us")}</a>
                </span>        
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6">
          <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
              <p className="text-sm text-white font-bold mb-2">
                © UHome by Grupo 12 PTI/PTR - Ano Letivo 2020/2021
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
