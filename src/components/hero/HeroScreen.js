import { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { heroeImages } from '../../helpers/heroImages';
import { getHeroById } from '../selectors/getHeroById';

// import batman from '../../assets/dc-batman.jpg'; // recurso estatico
//const heroeImages = require.context('../../assets/',true);

export const HeroScreen = () => {

  const { heroeId } = useParams();
  const navigate = useNavigate();

  const hero = useMemo( () => getHeroById( heroeId), [ heroeId]);

  const handleReturn = () => {
    navigate(-1); // va a la pagina donde estaba antes
  }

  if (!hero) {
    return <Navigate to='/' />
  }

  const {
     id,
     superhero,
     publisher,
     alter_ego,
     first_appearance,
     characters
  } = hero;

  const imagePath = `/assets/${id}.jpg`; //  desde  public/assets

  return (
    <div className="row mt-5">
        <div className="col-4">
            <img src={ heroeImages(`./${id}.jpg`) }
                  // src={ batman } import
                  // src={ imagePath } desde  public/assets
                  alt={ superhero } 
                  className="img-thumbnail animate__animated animate__fadeInLeft"
            />
        </div>
        <div className="col-8 animate__animated animate__fadeIn">
            <h3> {hero.superhero}</h3>
            <ul className=" list-group">
              <li className="list-group-item"> <b>Alter ego:</b> { alter_ego } </li>
              <li className="list-group-item"> <b>Publisher:</b> { publisher } </li>
              <li className="list-group-item"> <b>First Appearance:</b> { first_appearance } </li>
            </ul>
            <h5 className="mt-3"> Characters</h5>
            <p className=""> { characters }</p>

            <button
              className="btn btn-outline-info"
              onClick={ handleReturn }
            >
              Volver
            </button>
        </div>
    </div>
  )
}
