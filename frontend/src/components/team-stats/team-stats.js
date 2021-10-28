import React from "react";

import ApexChart from "../chart/chart";
import ProgressWithLabel from "../progress-with-label/progress-with-label";

import { FaBrain } from "react-icons/fa";
import { GiBiceps } from "react-icons/gi";
import { RiSpeedFill, RiShieldFill, RiSwordFill } from "react-icons/ri";
import { ImPower } from "react-icons/im";

const TeamStats = ({ team }) => (
  <div className="bg-dark p-2 rounded-3 shadow h-100">
    <div class="card bg-light h-100 text-center">
      <div class="card-body pb-0">
        <h5 class="card-title">Acumulativo de equipo</h5>
        <hr />
        <div className="row row-cols-2">
          <div className="col my-auto">
            <ApexChart series={team.averages.total} />
          </div>
          <div className="col">
            <ProgressWithLabel
              progressClasses="my-1 border border-dark w-100"
              progressBarWidth={team.averages.intelligence}
              progressBarClasses="bg-danger"
              label={
                <div>
                  <FaBrain /> Inteligencia
                </div>
              }
            >
              {team.averages.intelligence}
            </ProgressWithLabel>
            <ProgressWithLabel
              progressClasses="my-1 border border-dark w-100"
              progressBarWidth={team.averages.strength}
              progressBarClasses="bg-danger"
              label={
                <div>
                  <GiBiceps /> Fuerza
                </div>
              }
            >
              {team.averages.strength}
            </ProgressWithLabel>
            <ProgressWithLabel
              progressClasses="my-1 border border-dark w-100"
              progressBarWidth={team.averages.speed}
              progressBarClasses="bg-danger"
              label={
                <div>
                  <RiSpeedFill /> Velocidad
                </div>
              }
            >
              {team.averages.speed}
            </ProgressWithLabel>
            <ProgressWithLabel
              progressClasses="my-1 border border-dark w-100"
              progressBarWidth={team.averages.durability}
              progressBarClasses="bg-danger"
              label={
                <div>
                  <RiShieldFill /> Durabilidad
                </div>
              }
            >
              {team.averages.durability}
            </ProgressWithLabel>
            <ProgressWithLabel
              progressClasses="my-1 border border-dark w-100"
              progressBarWidth={team.averages.power}
              progressBarClasses="bg-danger"
              label={
                <div>
                  <ImPower /> Poder
                </div>
              }
            >
              {team.averages.power}
            </ProgressWithLabel>
            <ProgressWithLabel
              progressClasses="my-1 border border-dark w-100"
              progressBarWidth={team.averages.combat}
              progressBarClasses="bg-danger"
              label={
                <div>
                  <RiSwordFill /> Combate
                </div>
              }
            >
              {team.averages.combat}
            </ProgressWithLabel>
          </div>
        </div>
        <hr />
        <div class="row text-danger">
          <div class="col">
            <p class="fs-3 fw-bold lh-1">
              {team.averages.height}
              <div className="fs-6 d-inline">cm</div>
            </p>
            <p class="fs-6 lh-1 fw-bold">Promedio de altura</p>
          </div>
          <div class="col">
            <p class="fs-3 fw-bold lh-1">
              {team.averages.weight}
              <div className="fs-6 d-inline">kg</div>
            </p>
            <p class="fs-6 lh-1 fw-bold">Promedio de peso</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TeamStats;
