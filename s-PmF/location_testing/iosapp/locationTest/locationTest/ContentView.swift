//
//  ContentView.swift
//  locationTest
//
//  Created by Julia Nai on 2/3/24.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var locationManager = LocationManager()
    
    var body: some View {
        VStack {
            Text("Your Current Address:")
                .font(.headline)
            Text(locationManager.address)
                .padding()
        }
    }
}
