import { useState } from "react";
import styles from './index.module.scss';
import faturamento from '../data/faturamento.json';

export const Exercicios = () => {

    const [valorSoma, setValorSoma] = useState();
    const [fibonacci, setFibonacci] = useState();
    const [resultados, setResultados] = useState({
        menorFaturamento: null,
        maiorFaturamento: null,
        diasAcimaDaMedia: null
    });
    const [percentuais, setPercentuais] = useState({});
    const [stringInvertida, setStringInvertida] = useState('');

    const faturamentoPorEstado = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53
    };

    const varSoma = () => {
        let indice = 13;
        let soma = 0;
        let k = 0;

        while (k < indice) {
            k = k + 1;
            soma = soma + k;
        }
        setValorSoma(soma);
    };

    const Fibonacci = () => {
        let numTeste = parseInt(prompt("Informe um numero"));
        let numA = 0;
        let numB = 1;

        while (numB < numTeste) {
            let temp = numB;
            numB = numA + numB;
            numA = temp;
        }

        if (numB === numTeste || numTeste === 0) {
            setFibonacci(true);
        } else {
            setFibonacci(false);
        }
    };

    const processarFaturamento = (data) => {
        if (!data || !data.faturamento || data.faturamento.length === 0) {
            return;
        }

        const faturamentoDiario = data.faturamento
            .filter(entry => entry.valor > 0)
            .map(entry => entry.valor);

        const menorFaturamento = Math.min(...faturamentoDiario);
        const maiorFaturamento = Math.max(...faturamentoDiario);

        const somaFaturamento = faturamentoDiario.reduce((acc, valor) => acc + valor, 0);
        const mediaMensal = somaFaturamento / faturamentoDiario.length;

        const diasAcimaDaMedia = faturamentoDiario.filter(valor => valor > mediaMensal).length;

        setResultados({
            menorFaturamento,
            maiorFaturamento,
            diasAcimaDaMedia
        });
    };

    const calcularResultados = () => {
        processarFaturamento(faturamento);
    };

    const calcularPercentuais = (faturamento) => {
        const total = Object.values(faturamento).reduce((acc, valor) => acc + valor, 0);
        const percentuais = {};

        for (let estado in faturamento) {
            percentuais[estado] = ((faturamento[estado] / total) * 100).toFixed(2);
        }

        return percentuais;
    };

    const calcularPercentuaisFaturamento = () => {
        const percentuaisCalculados = calcularPercentuais(faturamentoPorEstado);
        setPercentuais(percentuaisCalculados);
    };

    const inverterString = () => {
        const stringOriginal = prompt("Informe uma string para inverter:");
        let stringInvertida = '';

        for (let i = stringOriginal.length - 1; i >= 0; i--) {
            stringInvertida += stringOriginal[i];
        }

        setStringInvertida(stringInvertida);
    };

    return (
        <section className={styles.exerciciosContainer}>
            <div className={styles.exercicio}>
                <h2>Valor variável SOMA</h2>
                <button onClick={varSoma}>Clique para Somar</button>
                <span>O valor da soma é: {valorSoma}</span>
            </div>
            <div className={styles.exercicio}>
                <h2>Numero Fibonacci</h2>
                <button onClick={Fibonacci}>Testar Fibonacci</button>
                {fibonacci ? <span>Numero pertence a sequência</span> : <span>Numero não pertence a sequência</span>}
            </div>
            <div className={styles.exercicio}>
                <h2>Calculo Faturamento</h2>
                <button onClick={calcularResultados}>Calcular faturamento</button>
                <div>
                    <p>Menor valor: R$ {resultados.menorFaturamento}</p>
                    <p>Maior valor: R$ {resultados.maiorFaturamento}</p>
                    <p>Dias acima da média: {resultados.diasAcimaDaMedia}</p>
                </div>
            </div>
            <div className={styles.exercicio}>
                <h2>Percentual de Faturamento por Estado</h2>
                <button onClick={calcularPercentuaisFaturamento}>Calcular Percentuais</button>
                <div>
                    {Object.keys(percentuais).length > 0 && (
                        <ul>
                            {Object.entries(percentuais).map(([estado, percentual]) => (
                                <li key={estado}>{estado}: {percentual}%</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className={styles.exercicio}>
                <h2>Inverter String</h2>
                <button onClick={inverterString}>Inverter String</button>
                {stringInvertida && <p>String invertida: {stringInvertida}</p>}
            </div>
        </section>
    );
};
