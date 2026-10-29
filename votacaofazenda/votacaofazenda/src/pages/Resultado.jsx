import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    obterVotos,
    calcularTotalVotos,
    calcularResultado,
    zerarVotos,
} from '../services/votacaoService';

function Resultado() {
    const [votos, setVotos] = useState(() => obterVotos());


    const total = calcularTotalVotos(votos);
    const resultado = calcularResultado(votos);

    function handleZerar() {
        if (window.confirm('Apagar todos os votos?')) {
            zerarVotos();
            setVotos({});
        }
    }

    return (
        <main>
            <h1>Resultado da eliminação</h1>

            {total === 0 ? (
                <p>
                    Ainda não há votos. <Link to="/votacao">Vote agora</Link>
                </p>
            ) : (
                <>
                    <p>Total de votos: {total}</p>
                    <ul className="placar">
                        {resultado.map((p, i) => (
                            <li key={p.id} className={i === 0 ? 'placar-item placar-lider' : 'placar-item'}>
                                <strong>{p.nome}</strong>
                                {i === 0 && <span className="selo-lider">Sairia hoje</span>}
                                <span>
                                    {p.votos} votos (
                                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%)
                                </span>
                                <div className="barra">
                                    <div className="barra-preenchida" style={{ width: `${p.percentual}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleZerar}>
                        Zerar votação
                    </button>
                </>
            )}
        </main>
    );
}

export default Resultado;