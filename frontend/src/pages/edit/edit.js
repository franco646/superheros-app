import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import * as yup from "yup";
import { Formik, Form, FieldArray } from "formik";

import { useParams, Redirect } from "react-router-dom";

import FloatingInput from "../../components/floating-input/floating-input";
import Spinner from "../../components/spinner/spinner";
import HeroFinder from "../../components/hero-finder/hero-finder";
import Button from "../../components/button/button";
import Team from "../../components/team/team";

import { clearHeroes } from "../../redux/heroes/heroes.actions";
import { fetchTeam, saveTeam, clearTeam } from "../../redux/team/team.actions";

import {
  GOOD_HEROES_PER_TEAM,
  BAD_HEROES_PER_TEAM,
  HEROES_PER_TEAM,
} from "../../constants";

const teamSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ingrese el nombre de su equipo.")
    .min(3, "El nombre del equipo debe tener mínimo 3 caracteres.")
    .max(25, "El nombre del equipo debe tener máximo 25 caracteres."),
  heroes: yup
    .array()
    .length(
      HEROES_PER_TEAM,
      `El equipo debe contener ${HEROES_PER_TEAM} miembros.`
    ),
});

const Edit = ({
  team,
  isFetching,
  isSaving,
  fetchTeam,
  saveTeam,
  clearTeam,
  clearHeroes,
  redirectTo,
}) => {
  let { teamId } = useParams();

  useEffect(() => {
    clearHeroes();
    async function fetchData() {
      if (teamId) {
        await fetchTeam(teamId);
      }
    }
    fetchData()
    return () => clearTeam();
  }, [teamId, fetchTeam, clearHeroes, clearTeam]);

  const handleSubmit = (team) => {
    saveTeam(team);
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return isFetching ? (
    <Spinner />
  ) : (
    <div className="container">
      <h2 className="m-3">Vista previa del equipo</h2>
      <Formik
        validationSchema={teamSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={team}
      >
        {({ values, errors, setErrors, handleChange }) => {
          const heroes = values.heroes;

          const goodHeroesCount = heroes.filter(
            (hero) => hero.biography.alignment === "good"
          ).length;
          const badHeroesCount = heroes.filter(
            (hero) => hero.biography.alignment === "bad"
          ).length;

          return (
            <Form>
              <div className="row row-cols-1 row-cols-sm-2">
                <div className="col col-12 col-sm-7 col-md-8">
                  <FloatingInput
                    type="text"
                    label="Nombre del equipo"
                    id="team__name-input"
                    maxLength={25}
                    name="name"
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col col-12 col-sm-5 col-md-4 pb-3">
                  <Button
                    className="w-100 h-100 btn-lg btn-primary"
                    type="submit"
                  >
                    {isSaving ? (
                      <Spinner />
                    ) : teamId ? (
                      "Finalizar Edicion"
                    ) : (
                      "Crear equipo"
                    )}
                  </Button>
                </div>
              </div>
              <FieldArray
                name="heroes"
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(arrayHelpers) => (
                  <div>
                    <Team
                      team={values}
                      isInvalid={errors.heroes ? true : false}
                      editionMode={true}
                      onRemoveHero={(index) => {
                        arrayHelpers.remove(index);
                        setErrors({});
                      }}
                    />
                    <div className="text-danger text-center mb-3">
                      {errors.heroes}
                    </div>
                    <HeroFinder
                      teamHeroes={heroes}
                      onSelectHero={(hero) => {
                        const heroAlignment = hero.biography.alignment;
                        if (
                          heroAlignment === "good" &&
                          goodHeroesCount < GOOD_HEROES_PER_TEAM
                        ) {
                          setErrors({});
                          return arrayHelpers.push(hero);
                        }
                        if (
                          heroAlignment === "bad" &&
                          badHeroesCount < BAD_HEROES_PER_TEAM
                        ) {
                          setErrors({});
                          return arrayHelpers.push(hero);
                        }
                        setErrors({
                          heroes: `El equipo debe contener ${GOOD_HEROES_PER_TEAM} miembros con orientación buena y ${BAD_HEROES_PER_TEAM} con orientación mala.`,
                        });
                      }}
                    />
                  </div>
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Edit.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    heroes: PropTypes.arrayOf(
      PropTypes.shape({
        biography: PropTypes.shape({
          alignment: PropTypes.string,
        }),
      })
    ),
  }),
  isFetching: PropTypes.bool,
  isSaving: PropTypes.bool,
  fetchTeam: PropTypes.func,
  saveTeam: PropTypes.func,
  clearTeam: PropTypes.func,
  clearHeroes: PropTypes.func,
  redirectTo: PropTypes.string,
};

const mapStateToProps = (state) => ({
  team: state.team.team,
  isFetching: state.team.isFetching,
  isSaving: state.team.isSaving,
  redirectTo: state.redirect.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeam: (id) => dispatch(fetchTeam(id)),
  saveTeam: (team) => dispatch(saveTeam(team)),
  clearHeroes: () => dispatch(clearHeroes()),
  clearTeam: () => dispatch(clearTeam()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
