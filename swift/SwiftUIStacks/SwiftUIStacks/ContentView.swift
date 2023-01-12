//
//  ContentView.swift
//  SwiftUIStacks
//
//  Created by mondo on 2022/12/29.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            HStack {
                VStack(alignment: .leading, spacing: 10) {
                    Text("会员套餐")
                        .font(.system(.title))
                        .fontWeight(.bold)
                    Text("解锁高级功能")
                        .font(.title)
                        .fontWeight(.bold)
                }
                
                Spacer()
            }
            .padding(.horizontal)
            
            HStack {
                ZStack {
                    VStack {
                        Text("连续包月")
                            .font(.system(size: 17))
                            .fontWeight(.bold)
                            .foregroundColor(Color(red: 190/255, green: 188/255, blue: 184/255))
                        Text("¥18")
                            .font(.system(size: 30))
                            .fontWeight(.bold)
                            .foregroundColor(Color(red: 239/255, green: 129/255, blue: 112/255))
                    }
                    .frame(minWidth: 0, maxWidth: .infinity, minHeight: 90)
                    .padding(20)
                    .background(Color("faf7f3"))
        //            .border(Color(red: 202/255, green: 169/255, blue: 106/255), width: 2)
        //            .cornerRadius(10)
                    .overlay(RoundedRectangle(cornerRadius: 6)
                    .stroke(Color(red: 202/255, green: 169/255, blue: 106/255),lineWidth: 2))
                    
                    Text("首月特惠")
                        .font(.system(size: 14))
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(5)
                        .background(Color(red: 202 / 255, green: 169 / 255, blue: 106 / 255))
                        .cornerRadius(4)
                        .offset(x: 0, y: -65)
                }
                
                VStack {
                    Text("1个月")
                        .font(.system(size: 17))
                        .fontWeight(.bold)
                        .foregroundColor(Color(red: 190/255, green: 188/255, blue: 184/255))
                    Text("¥30")
                        .font(.system(size: 30))
                        .fontWeight(.bold)
                        .foregroundColor(Color(red: 239/255, green: 129/255, blue: 112/255))
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 90)
                .padding(20)
                .background(Color("faf7f3"))
                .cornerRadius(10)
                
                VStack {
                    Text("12个月")
                        .fontWeight(.bold)
                        .font(.system(size: 17))
                        .foregroundColor(Color(red: 190/255, green: 188/255, blue: 184/255))
                    Text("¥228")
                        .fontWeight(.bold)
                        .font(.system(size: 30))
                        .minimumScaleFactor(0.7)
                        .lineLimit(1)
                        .foregroundColor(Color(red: 239/255, green: 129/255, blue: 112/255))
                    Text("¥19.00/月")
                        .fontWeight(.bold)
                        .font(.system(size: 17))
                        .minimumScaleFactor(0.7)
                        .lineLimit(1)
                        .foregroundColor(Color(red: 190/255, green: 188/255, blue: 184/255))
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 90)
                .padding(20)
                .background(Color("faf7f3"))
                .cornerRadius(10)
            }
            .padding(.horizontal)
            
            Spacer()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
