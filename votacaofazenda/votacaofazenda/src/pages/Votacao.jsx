import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/PartcipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
    const [ultimoVoto, setUltimoVoto] = useState(null);
    const [votosNaSessao, setVotosNaSessao] = useState(0);

    const naRoca = listarNaRoca();
    const foraDaRoca = listarForaDaRoca();

    function handleVotar(participante) {
        registrarVoto(participante.id);
        setUltimoVoto(participante);
        setVotosNaSessao(votosNaSessao + 1);
    }

    return (
        <main>
            <h1>Quem deve sair da roça?</h1>

            {ultimoVoto !== null && (
                <p className="confirmacao">
                    Voto registrado em {ultimoVoto.nome}! Você já votou {votosNaSessao}{' '}
                    {votosNaSessao === 1 ? 'vez' : 'vezes'}.{' '}
                    <Link to="/resultado">Ver resultado</Link>
                </p>
            )}

            <section className="grade-roca">
                {naRoca.map((p) => (
                    <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
                ))}
            </section>

            <h2>Demais peões</h2>
            <section className="grade-peoes">
                {foraDaRoca.map((p) => (
                    <ParticipanteCard key={p.id} participante={p} />
                ))}
            </section>
        </main>
    );
}

export default Votacao;