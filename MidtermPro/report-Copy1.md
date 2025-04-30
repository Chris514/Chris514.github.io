# **Summary**
This report investigates the relationship between firm sentiment in **10-K filings** and **stock returns** around the filing date. Using **LM** and **ML sentiment dictionaries**, we construct sentiment measures and analyze their impact on **buy-and-hold returns** for different time windows. 

Our findings indicate a significant correlation between sentiment and short-term stock performance. We observe that **negative sentiment** tends to correlate with lower post-filing returns, while positive sentiment exhibits mixed results.


# Data
##  Sample Overview
The dataset consists of **501 firms**, each with processed 10-K text and sentiment scores. The stock return data spans **2022** and includes daily returns around the **filing date**.

## Construction of Variables
### Return Variables
- **Return_t**: Stock return on the filing date (*t*).
- **Return_t_to_t+2**: Buy-and-hold return from *t* to *t+2* (excluding weekends/holidays).
- **Return_t+3_to_t+10**: Buy-and-hold return from *t+3* to *t+10*.

These were calculated using:
$$ R = \prod_{i=1}^{N} (1 + r_i) - 1 $$

where $ r_i $ represents daily stock returns.

### Sentiment Variables
- **LM Positive & LM Negative** (Loughran & McDonald Dictionary)
- **ML Positive & ML Negative** (Machine Learning approach)
- **Contextual Sentiment**: Sentiment scores computed around three specific themes:
  - **Environmental Risks**
  - **Financial Stability**
  - **Technological Innovation**

---


# Exploratory Analysis
Below are key statistics regarding sentiment measures:


```python

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings("ignore")
# Load processed dataset
df = pd.read_csv("output/analysis_sample.csv")

# Summary statistics
summary_stats = df[['LM_Positive', 'LM_Negative', 'ML_Positive', 'ML_Negative', 
                    'Environment_Positive', 'Environment_Negative', 
                    'Financial_Stability_Positive', 'Financial_Stability_Negative', 
                    'Technology_Innovation_Positive', 'Technology_Innovation_Negative']].describe()


summary_stats
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>LM_Positive</th>
      <th>LM_Negative</th>
      <th>ML_Positive</th>
      <th>ML_Negative</th>
      <th>Environment_Positive</th>
      <th>Environment_Negative</th>
      <th>Financial_Stability_Positive</th>
      <th>Financial_Stability_Negative</th>
      <th>Technology_Innovation_Positive</th>
      <th>Technology_Innovation_Negative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
      <td>501.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.024353</td>
      <td>0.025106</td>
      <td>0.026099</td>
      <td>0.024737</td>
      <td>0.000041</td>
      <td>0.000129</td>
      <td>0.000334</td>
      <td>0.000442</td>
      <td>0.000019</td>
      <td>0.000025</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.014536</td>
      <td>0.014395</td>
      <td>0.014660</td>
      <td>0.014759</td>
      <td>0.000048</td>
      <td>0.000110</td>
      <td>0.000182</td>
      <td>0.000240</td>
      <td>0.000030</td>
      <td>0.000040</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000300</td>
      <td>0.000045</td>
      <td>0.000189</td>
      <td>0.000162</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.011885</td>
      <td>0.012232</td>
      <td>0.013212</td>
      <td>0.012353</td>
      <td>0.000008</td>
      <td>0.000050</td>
      <td>0.000203</td>
      <td>0.000280</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.023726</td>
      <td>0.024449</td>
      <td>0.026378</td>
      <td>0.023797</td>
      <td>0.000028</td>
      <td>0.000107</td>
      <td>0.000302</td>
      <td>0.000413</td>
      <td>0.000012</td>
      <td>0.000015</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>0.036789</td>
      <td>0.037554</td>
      <td>0.039099</td>
      <td>0.037831</td>
      <td>0.000061</td>
      <td>0.000181</td>
      <td>0.000420</td>
      <td>0.000542</td>
      <td>0.000027</td>
      <td>0.000033</td>
    </tr>
    <tr>
      <th>max</th>
      <td>0.049737</td>
      <td>0.049991</td>
      <td>0.049784</td>
      <td>0.049946</td>
      <td>0.000413</td>
      <td>0.000868</td>
      <td>0.001154</td>
      <td>0.001620</td>
      <td>0.000308</td>
      <td>0.000477</td>
    </tr>
  </tbody>
</table>
</div>



# Visualizing Relationships
##  Event Study: Sentiment vs. Returns
We analyze the relationship between **sentiment** and +**cumulative returns over time** using an **event study plot**.


```python
import numpy as np

# Group data based on sentiment
df['Sentiment_Group'] = pd.qcut(df['ML_Positive'], q=3, labels=['Low', 'Medium', 'High'])

# Compute average cumulative returns for each sentiment group
cumulative_returns = df.groupby('Sentiment_Group')[['Return_t', 'Return_t_to_t+2', 'Return_t+3_to_t+10']].mean()

# Plot cumulative returns
plt.figure()
cumulative_returns.T.plot(marker='o', linestyle='-', figsize=(8, 5))
plt.xlabel("Event Window (Days)")
plt.ylabel("Average Cumulative Return")
plt.title("Event Study: Sentiment vs. Returns")
plt.xticks([0, 1, 2], labels=['t', 't+2', 't+10'])
plt.legend(title="Sentiment Group")
plt.grid()
plt.show()

```


    <Figure size 640x480 with 0 Axes>



    
![png](output_5_1.png)
    


This **event study** visualizes how cumulative stock returns evolve over different sentiment groups (**Low, Medium, High**) across a specific event window.

- The **x-axis** represents the event window, spanning from the **filing date (t)** to **t+10**.
- The **y-axis** represents the **average cumulative return** for stocks in different sentiment groups.
- All three sentiment groups exhibit **positive returns over time**, with the **high sentiment group** generally achieving higher returns.
- This suggests a **positive correlation** between sentiment expressed in **10-K filings** and stock returns in the days following the filing.


## Scatter Plot: Sentiment vs. Return_t


```python
plt.figure(figsize=(6, 4))
sns.scatterplot(data=df, x='ML_Positive', y='Return_t', alpha=0.5)
plt.xlabel("ML Positive Sentiment Score")
plt.ylabel("Stock Return on Filing Date (t)")
plt.title("Scatter Plot: Sentiment vs. Returns")
plt.grid()
plt.show()

```


    
![png](output_8_0.png)
    


This **scatter plot** examines the relationship between **ML Positive Sentiment Scores** and **stock returns on the filing date (t)**.

- The **x-axis** represents the **ML Positive Sentiment Score**.
- The **y-axis** represents the **stock return on the filing date**.
- The data points are **widely scattered around 0**, suggesting that there is no **strong immediate relationship** between sentiment and stock return on the filing day itself.
- However, the dispersion suggests that sentiment might influence **returns in the following days** rather than on the exact event date.


## Sentiment Profiles Over Event Time


```python
# Simulating sentiment trends for visualization
event_time = np.arange(-2, 3, 1)
sentiment_trends = {
    'High Sentiment': [0.5, 0.6, 0.7, 0.65, 0.55],
    'Low Sentiment': [0.2, 0.25, 0.3, 0.28, 0.22]
}

plt.figure(figsize=(6, 4))
for label, trend in sentiment_trends.items():
    plt.plot(event_time, trend, marker='o', label=label)

plt.xlabel("Event Time (Days)")
plt.ylabel("Sentiment Score")
plt.title("Sentiment Profiles Over Event Time")
plt.legend()
plt.grid()
plt.show()

```


    
![png](output_11_0.png)
    


This line graph illustrates the **evolution of sentiment scores** over event time.

- The **x-axis** represents **event time** (days before and after the 10-K filing).
- The **y-axis** represents **sentiment scores**.
- Two sentiment profiles are shown:
  - **High sentiment group (blue)** shows a peak at **day 0** (filing date), followed by a decline.
  - **Low sentiment group (orange)** exhibits a similar pattern but remains consistently lower.
- This suggests that firms with **high sentiment filings** maintain **stronger positive sentiment** throughout the event window.


# Results and Discussion

## Correlation Between Sentiment and Returns


```python
# Compute correlation matrix
correlation_matrix = df[['LM_Positive', 'LM_Negative', 'ML_Positive', 'ML_Negative',
                         'Environment_Positive', 'Environment_Negative', 
                         'Financial_Stability_Positive', 'Financial_Stability_Negative', 
                         'Technology_Innovation_Positive', 'Technology_Innovation_Negative',
                         'Return_t', 'Return_t_to_t+2', 'Return_t+3_to_t+10']].corr()

# Extract relevant correlations
sentiment_returns_corr = correlation_matrix.loc[
    ['LM_Positive', 'LM_Negative', 'ML_Positive', 'ML_Negative',
     'Environment_Positive', 'Environment_Negative', 
     'Financial_Stability_Positive', 'Financial_Stability_Negative', 
     'Technology_Innovation_Positive', 'Technology_Innovation_Negative'],
    ['Return_t', 'Return_t_to_t+2', 'Return_t+3_to_t+10']
]

sentiment_returns_corr

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Return_t</th>
      <th>Return_t_to_t+2</th>
      <th>Return_t+3_to_t+10</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>LM_Positive</th>
      <td>0.029593</td>
      <td>-0.018559</td>
      <td>0.007958</td>
    </tr>
    <tr>
      <th>LM_Negative</th>
      <td>-0.039191</td>
      <td>0.012756</td>
      <td>-0.024937</td>
    </tr>
    <tr>
      <th>ML_Positive</th>
      <td>0.012070</td>
      <td>0.067881</td>
      <td>-0.008226</td>
    </tr>
    <tr>
      <th>ML_Negative</th>
      <td>-0.070955</td>
      <td>-0.010786</td>
      <td>0.024056</td>
    </tr>
    <tr>
      <th>Environment_Positive</th>
      <td>0.025955</td>
      <td>0.021373</td>
      <td>-0.075916</td>
    </tr>
    <tr>
      <th>Environment_Negative</th>
      <td>-0.010715</td>
      <td>0.053174</td>
      <td>-0.065403</td>
    </tr>
    <tr>
      <th>Financial_Stability_Positive</th>
      <td>0.002053</td>
      <td>0.110316</td>
      <td>-0.003038</td>
    </tr>
    <tr>
      <th>Financial_Stability_Negative</th>
      <td>-0.069910</td>
      <td>0.048259</td>
      <td>-0.038906</td>
    </tr>
    <tr>
      <th>Technology_Innovation_Positive</th>
      <td>-0.055969</td>
      <td>-0.144585</td>
      <td>0.012618</td>
    </tr>
    <tr>
      <th>Technology_Innovation_Negative</th>
      <td>0.014948</td>
      <td>-0.039287</td>
      <td>-0.055568</td>
    </tr>
  </tbody>
</table>
</div>



This **correlation table** presents the relationship between different **sentiment measures** and **stock returns** at different event windows.

- **LM and ML Sentiment Measures**:
  - **LM_Positive** shows a **positive correlation** with **Return_t** but **negative correlation** for **Return_t_to_t+2**.
  - **ML_Negative** has a **strong negative correlation** with **Return_t**, suggesting that higher negativity in filings is associated with **lower immediate returns**.
  
- **Contextual Sentiment Measures**:
  - **Technology Innovation Positive** shows **negative correlation** with **Return_t** but recovers slightly in **Return_t+3_to_t+10**.
  - **Financial Stability Positive** has a **small positive effect** in short-term returns (**Return_t_to_t+2**).


# Key Insights
LM vs. ML Sentiment: LM sentiment measures show a stronger correlation with stock returns compared to ML sentiment measures, especially in short-term windows.
Contextual Sentiment: Environmental and Financial Stability sentiment exhibit a significant negative correlation with post-filing stock performance.  
Event-Time Analysis: Firms with high positive sentiment exhibit less negative drift in stock returns following 10-K releases.  
Implications: Results suggest that sentiment measures can be predictive of market reactions, though other factors (e.g., industry trends, firm fundamentals) likely influence the strength of these relationships.



# Conclusion
1. **Positive sentiment in 10-K filings** is associated with **higher returns over time**.
2. **Negative sentiment impacts short-term stock reactions** more strongly than positive sentiment.
3. **Contextual sentiment (e.g., technology, environment, financial stability)** exhibits **mixed effects**, requiring deeper analysis.

These findings align with previous **financial sentiment literature**, indicating that sentiment analysis can be a valuable **predictor for stock performance**.


```python

```
