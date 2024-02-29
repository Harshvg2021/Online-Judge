#include<bits/stdc++.h>
using namespace std;

#define ll long long
#define all(x) x.begin(),x.end()

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t;cin>>t;
    while(t--){
        int n,k;
        cin>>n>>k;
        vector<int> v(n);
        map<int,int> m;
        for(auto &it: v){
            cin>>it;
            m[it]++;
        }
        bool res = false;
        for(int i=0;i< n; ++i){
            if(m.count(k-v[i])){
                res=  true;
                break;
            }
        }
        if(res)cout<<"yes\n";
        else cout<<"no\n";
        
    }
    return 0;   
}