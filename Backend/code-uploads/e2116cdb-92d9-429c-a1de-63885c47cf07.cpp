#include<bits/stdc++.h>
using namespace std;

#define ll long long
#define all(x) x.begin(),x.end()

bool dp[101][100000+1];

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;cin>>n;
    vector<int> v(n);
    for(auto &it : v)cin>>it;
    dp[0][0] = true;
    for(int i=1;i <=n; ++i){
        for(int curr= 0;curr<= 1e5; ++curr){
            dp[i][curr] = dp[i-1][curr];
            if(curr - v[i-1]>=0 && dp[i-1][curr-v[i-1]]){
                dp[i][curr] = true;
            }
        }
    }
    vector<int> res;
    for(int i=1;i<=1e5; ++i){
        if(dp[n][i])res.push_back(i);
    }
    cout<<res.size()<<'\n';
    for(auto it: res)cout<<it<<' ';

    return 0;
}