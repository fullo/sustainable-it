# Template: Triple Bottom Line Canvas
Materiali di supporto al libro "[Sustainable IT the Right Way](https://leanpub.com/sustainable-it)" di Francesco Fullone.

*Riferimento: Capitolo 1, Esercizio #1 "Il Vero Costo del Software"*

## Scopo

Valutare decisioni tecniche su tre dimensioni simultaneamente (Planet, People, Profit) per identificare quick win con ROI positivo su tutte e tre.

## Canvas

```
┌─────────────────┬─────────────────┬─────────────────┐
│     PLANET      │     PEOPLE      │     PROFIT      │
├─────────────────┼─────────────────┼─────────────────┤
│ Carbon footprint│ Accessibility   │ TCO Reduction   │
│ Energy consumed │ Privacy         │ Talent retention│
│ E-waste         │ Wellbeing       │ Brand reputation│
│ Water usage     │ Digital incl.   │ Risk mitigation │
└─────────────────┴─────────────────┴─────────────────┘
```

## Come compilarlo

1. **Seleziona decisione tecnica** da valutare (es. "Migrazione da EC2 a Lambda")
2. **Per ogni dimensione**, rispondi:
   - Qual è l'impatto positivo? (quantificalo se possibile)
   - Qual è l'impatto negativo? (quantificalo se possibile)
   - Net impact: positivo o negativo?
3. **Identifica quick win**: decisioni con net impact positivo su tutte e tre le dimensioni
4. **Calcola ROI integrato**: non solo finanziario ma Planet + People + Profit

## Esempio compilato

**Decisione**: Implementare lazy loading immagini su homepage

| PLANET | PEOPLE | PROFIT |
|--------|--------|--------|
| -60% page weight, -60% carbon per pageview = 12 t CO2e/anno saved | +40% performance mobile, accessibile su connessioni lente = +15% utenti low-end device | +18% conversion rate, €180k/anno revenue increase, 2 dev-days effort = ROI 450x |

**Conclusione**: Triple win — Implementare subito (quick win)

---

*Licenza: CC BY-NC-SA 4.0 — Daruma Consulting di Francesco Fullone*
*Repository: https://github.com/fullo/sustainable-it*
